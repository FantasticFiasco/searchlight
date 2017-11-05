import Vue from 'vue';

import { ExceptionEvent } from 'common/analytics';
import { AnalyticsService } from './services';

/**
 * Enable reporting Vue exceptions.
 * @param analyticsService the analytics service
 */
export function reportExceptions(analyticsService: AnalyticsService) {
    Vue.config.warnHandler = (message: string, viewModel: Vue, trace: string) => {
        const event = new ExceptionEvent(`${message}; vm: ${JSON.stringify(viewModel)}; trace: ${trace}`);
        analyticsService.reportException(event);
    };

    Vue.config.errorHandler = (error: Error, viewModel: Vue, info: string) => {
        const event = new ExceptionEvent(`${JSON.stringify(error)}; vm: ${JSON.stringify(viewModel)}; trace: ${info}`);
        analyticsService.reportException(event);
    };
}
