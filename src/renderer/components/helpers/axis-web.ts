/**
 * Returns the product page URL on www.axis.com.
 * @param modelNumber the model number
 */
export function productPageUrl(modelNumber: string | undefined): string {
    if (modelNumber === undefined) {
        return 'https://www.axis.com/products-and-solutions';
    }

    modelNumber = modelNumber.toLowerCase();
    modelNumber = (modelNumberToProductPageExceptions[modelNumber] || modelNumber).replace(' ', '-');
    return `https://www.axis.com/products/axis-${modelNumber}`;
}

/**
 * Returns the icon URL on www.axis.com.
 * @param modelNumber the model number
 */
export function iconUrl(modelNumber: string | undefined): string {
    if (modelNumber === undefined) {
        return '';
    }

    modelNumber = modelNumber.toLowerCase();
    modelNumber = modelNumberToIconExceptions[modelNumber] || modelNumber;
    return `https://www.axis.com/images/scaled/300/sites/default/files/${modelNumber}.png`;
}

const modelNumberToProductPageExceptions: { [key: string]: string } = {
    m3005: 'm3005-v',
    m3007: 'm3007-p',
    m3025: 'm3025-ve',

    p3367: 'p3367-v',
};

const modelNumberToIconExceptions: { [key: string]: string } = {
    '212 ptz': '212',
    '215 ptz': '215-ptz',
    '243sa': '243sa-video-server',

    'c1004-e': 'c1004-e-network-cabinet-speaker',

    'f34': 'f34-main-unit_0',
    'f44': 'f44-dual-audio-input_0',
    'fa54': 'fa54-main-unit',

    'm1054': 'm1054',
    'm2026-le-mkii': 'm2026-le-mk-ii',
    'm2026-le mk ii': 'm2026-le-mk-ii',
    'm3004': 'm3004-v',
    'm3005': 'm3005-v',
    'm3006': 'm3006-v',
    'm3007': 'm3007-p',
    'm3025': 'm3025-ve',
    'm3037': 'm3037-pve',
    'm3106-lve mk ii': 'm3106-lve',

    'p1346': 'p1346_0',
    'p3225-lv mk ii': 'p3225-lv',
    'p3364': 'p3364-ve',
    'p3367': 'p3367-v',
    'p3384': 'p3384-v',
    'p5635-e': 'p5635-e_0',
    'p8221': 'p8221-io-audio-module',

    'q1921': 'q1921_0',
    'q3505': 'q3505-v-mkii',
    'q3517': 'q3517-lv-ceiling-front',
    'q3617': 'q3617-ve',
    'q3709': 'q3709-pve_2',
    'q7406': 'q7406-blade',
    'q7414': 'q7414-blade',
    'q7436': 'q7436-blade',
};
