import * as expect from '@fantasticfiasco/expect';
import * as ua from 'universal-analytics';

import * as log from './../log';
import * as config from './config.json';

/**
 * Class reporting to Universal Analytics.
 */
export class Analytics {
    private readonly appName: string;
    private readonly visitor: ua.Visitor;

    /**
     * Initializes a new instance of the class.
     * @param appName name of the application
     * @param userId user id formatted as uuid
     */
    constructor(appName: string, userId: string) {
        expect.toExist(appName);
        expect.toExist(userId);

        log.info('Analytics - user id', userId);

        this.appName = appName;
        this.visitor = new ua.Visitor((config as any).trackingId, userId, { https: true });
    }

    /**
     * Enrich each report with a parameter.
     * @param key parameter key
     * @param value parameter value
     */
    public enrich(key: string, value: string) {
        expect.toExist(key);
        expect.toExist(value);

        this.visitor.set(key, value);
    }

    /**
     * Report about a viewed screen
     * @param screenName name of the viewed screen
     */
    public reportScreenView(screenName: string) {
        expect.toExist(screenName);

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

        this.visitor.event(category, action, this.errorHandler);
    }

    /**
     * Report about application event containing a value
     * @param category category of the event
     * @param action name of the action
     * @param label label of the value
     * @param value the value
     */
    public reportEventWithValue(category: string, action: string, label: string, value: string | number) {
        expect.toExist(category);
        expect.toExist(action);
        expect.toExist(label);

        this.visitor.event(category, action, label, value, this.errorHandler);
    }

    /**
     * Report application exception
     * @param description description of the exception
     * @param fatal whether the exception is fatal to the application
     */
    public reportException(description: string, fatal: boolean = false) {
        expect.toExist(description);

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

        this.visitor.timing(category, variable, time, this.errorHandler);
    }

    private errorHandler(error: Error | null, count: number) {
        if (error) {
            log.error('Analytics', error, count);
        }
    }
}
