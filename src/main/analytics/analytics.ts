import * as expect from '@fantasticfiasco/expect';
import { ipcMain } from 'electron';
import * as ua from 'universal-analytics';

import { ExceptionEvent, PageViewEvent, ValueEvent } from 'common/analytics';
import * as ChannelNames from 'common/analytics/channel-names';
import * as config from '../config.json';
import * as log from '../log';

/**
 * Class reporting to Universal Analytics.
 */
export class Analytics {
    private static readonly IdFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    private readonly visitor: ua.Visitor;

    /**
     * Initializes a new instance of the class.
     * @param clientId client id formatted as uuid
     * @param userId user id formatted as uuid
     */
    constructor(clientId: string, userId: string) {
        expect.toBeTrue(Analytics.IdFormat.test(clientId));
        expect.toBeTrue(Analytics.IdFormat.test(userId));

        log.info('Analytics', 'client id', clientId);
        log.info('Analytics', 'user id', userId);

        const options: ua.VisitorOptions = {
            tid: (config as any).analytics.trackingId,
            cid: clientId,
            uid: userId,
            https: true,
        };

        this.visitor = new ua.Visitor(options);

        // Register for messages sent from the renderer
        ipcMain.on(
            ChannelNames.ANALYTICS_REPORT_EVENT_WITH_VALUE,
            (event: any, arg: ValueEvent) => this.reportEventWithValue(arg.category, arg.action, arg.label, arg.value));
        ipcMain.on(
            ChannelNames.ANALYTICS_REPORT_PAGE_VIEW,
            (event: any, arg: PageViewEvent) => this.reportPageView(arg.path));
        ipcMain.on(
            ChannelNames.ANALYTICS_REPORT_EXCEPTION,
            (event: any, arg: ExceptionEvent) => this.reportException(arg.description));
    }

    /**
     * Enrich each report with a parameter.
     * @param key parameter key
     * @param value parameter value
     */
    public enrich(key: string, value: string) {
        expect.toExist(key);
        expect.toExist(value);

        log.info('Analytics', 'enrich', key, value);

        this.visitor.set(key, value);
    }

    /**
     * Report about a viewed page
     * @param path path of the viewed page, must start with '/'
     */
    public reportPageView(path: string) {
        expect.toExist(path);
        expect.toBeTrue(path.startsWith('/'));

        log.info('Analytics', 'reportPageView', path);

        this.visitor.pageview(path, this.errorHandler);
    }

    /**
     * Report about application event
     * @param category category of the event
     * @param action name of the action
     */
    public reportEvent(category: string, action: string) {
        expect.toExist(category);
        expect.toExist(action);

        log.info('Analytics', 'reportEvent', category, action);

        this.visitor.event(category, action, this.errorHandler);
    }

    /**
     * Report about application event containing a value
     * @param category category of the event
     * @param action name of the action
     * @param label label of the value
     * @param value the value
     */
    public reportEventWithValue(category: string, action: string, label: string, value?: number) {
        expect.toExist(category);
        expect.toExist(action);
        expect.toExist(label);

        log.info('Analytics', 'reportEventWithValue', category, action, label, value);

        if (value) {
            this.visitor.event(category, action, label, value, this.errorHandler);
        } else {
            this.visitor.event(category, action, label, this.errorHandler);
        }
    }

    /**
     * Report application exception
     * @param description description of the exception
     * @param fatal whether the exception is fatal to the application
     */
    public reportException(description: string, fatal: boolean = false) {
        expect.toExist(description);

        log.info('Analytics', 'reportException', description, fatal);

        this.visitor.exception(description, fatal, this.errorHandler);
    }

    /**
     * Report duration, e.g. load time or time spent completing a operation
     * @param category category of the event
     * @param variable name of the duration variable
     * @param time the time in milliseconds
     */
    public reportDuration(category: string, variable: string, time: number) {
        expect.toExist(category);
        expect.toExist(variable);
        expect.toBeTrue(time >= 0);

        log.info('Analytics', 'reportDuration', category, variable, time);

        this.visitor.timing(category, variable, time, this.errorHandler);
    }

    private errorHandler(error: Error | null, count: number) {
        if (error) {
            log.error('Analytics', error, count);
        }
    }
}
