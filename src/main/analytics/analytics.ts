import * as expect from '@fantasticfiasco/expect';
import { ipcMain } from 'electron';
import * as ua from 'universal-analytics';

import { EventWithValue } from 'common/analytics/event-with-value';
import * as ChannelNames from 'common/channel-names';
import * as log from './../log';
import * as config from './config.json';

/**
 * Class reporting to Universal Analytics.
 */
export class Analytics {
    private static readonly IdFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    private readonly appName: string;
    private readonly visitor: ua.Visitor;

    /**
     * Initializes a new instance of the class.
     * @param appName name of the application
     * @param clientId client id formatted as uuid
     * @param userId user id formatted as uuid
     */
    constructor(appName: string, clientId: string, userId: string) {
        expect.toExist(appName);
        expect.toBeTrue(Analytics.IdFormat.test(clientId));
        expect.toBeTrue(Analytics.IdFormat.test(userId));

        log.info('Analytics - client id', clientId);
        log.info('Analytics - user id', userId);

        this.appName = appName;

        const options: ua.VisitorOptions = {
            tid: (config as any).trackingId,
            cid: clientId,
            uid: userId,
            https: true,
            debug: true,
        };

        this.visitor = new ua.Visitor(options);

        // Register for messages sent from the renderer
        ipcMain.on(
            ChannelNames.ANALYTICS_REPORT_EVENT_WITH_VALUE,
            (event: any, arg: EventWithValue) => this.reportEventWithValue(arg.category, arg.action, arg.label, arg.value));
    }

    /**
     * Enrich each report with a parameter.
     * @param key parameter key
     * @param value parameter value
     */
    public enrich(key: string, value: string) {
        expect.toExist(key);
        expect.toExist(value);

        log.info('Analytics - enrich', key, value);

        this.visitor.set(key, value);
    }

    /**
     * Report about a viewed screen
     * @param screenName name of the viewed screen
     */
    public reportScreenView(screenName: string) {
        expect.toExist(screenName);

        log.info('Analytics - reportScreenView', screenName);

        this.visitor.screenview(screenName, this.appName, this.errorHandler);
    }

    /**
     * Report about application event
     * @param category category of the event
     * @param action name of the action
     */
    public reportEvent(category: string, action: string) {
        expect.toExist(category);
        expect.toExist(action);

        log.info('Analytics - reportEvent', category, action);

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

        log.info('Analytics - reportEventWithValue', category, action, label, value);

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

        log.info('Analytics - reportException', description, fatal);

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

        log.info('Analytics - reportDuration', category, variable, time);

        this.visitor.timing(category, variable, time, this.errorHandler);
    }

    private errorHandler(error: Error | null, count: number) {
        if (error) {
            log.error('Analytics', error, count);
        }
    }
}
