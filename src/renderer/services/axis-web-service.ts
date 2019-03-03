/**
 * Key for the Axis web service in the Vue dependency injection framework.
 */
export const AXIS_WEB_SERVICE = Symbol();

/**
 * Class responsible for all interaction with www.axis.com.
 */
export class AxisWebService {
    /**
     * Returns the product page URL on www.axis.com.
     * @param modelNumber the model number
     */
    public productPageUrl(modelNumber: string | undefined): string {
        if (modelNumber === undefined) {
            return 'https://www.axis.com/products-and-solutions';
        }

        modelNumber = modelNumber.toLowerCase();

        const unconventionalUrl = modelNumberToProductPageExceptions[modelNumber];
        if (unconventionalUrl !== undefined) {
            return unconventionalUrl;
        }

        modelNumber = modelNumber.replace(/ /, '-');
        return `https://www.axis.com/products/axis-${modelNumber}`;
    }

    /**
     * Returns the icon URL on www.axis.com.
     * @param modelNumber the model number
     */
    public iconUrl(modelNumber: string | undefined): string {
    if (modelNumber === undefined) {
        return '';
    }

    modelNumber = modelNumber.toLowerCase();
    modelNumber = modelNumberToIconExceptions[modelNumber] || modelNumber;
    return `https://www.axis.com/images/scaled/300/sites/default/files/${modelNumber}.png`;
}
}

const modelNumberToProductPageExceptions: { [key: string]: string } = {
    '212 ptz': 'https://www.axis.com/products/axis-212',
    '215 ptz': 'https://www.axis.com/products/axis-215',
    '216fd': 'https://www.axis.com/products/axis-216',
    '243q(1) blade': 'https://www.axis.com/products/axis-243q',
    '243q(2) blade': 'https://www.axis.com/products/axis-243q',
    '243q(3) blade': 'https://www.axis.com/products/axis-243q',
    '243q(4) blade': 'https://www.axis.com/products/axis-243q',

    'a9188/-ve': 'https://www.axis.com/products/axis-a9188-ve',

    'c cube l': 'https://www.axis.com/companion/products-and-solutions/axis-companion-cube-l',

    'm3004': 'https://www.axis.com/products/axis-m3004-v',
    'm3005': 'https://www.axis.com/products/axis-m3005-v',
    'm3006': 'https://www.axis.com/products/axis-m3006-v',
    'm3007': 'https://www.axis.com/products/axis-m3007-p',
    'm3024': 'https://www.axis.com/products/axis-m3024-lve',
    'm3025': 'https://www.axis.com/products/axis-m3025-ve',
    'm3026': 'https://www.axis.com/products/axis-m3026-ve',
    'm3027': 'https://www.axis.com/products/axis-m3027-pve',
    'm3037': 'https://www.axis.com/products/axis-m3037-pve',
    'm3046': 'https://www.axis.com/products/axis-m3046-v',
    'm3046-1-8mm': 'https://www.axis.com/products/axis-m3046-v',
    'm3058': 'https://www.axis.com/products/axis-m3058-plve',
    'm3106-l-mkii': 'https://www.axis.com/products/axis-m3106-l mk-ii',
    'm3114': 'https://www.axis.com/products/axis-m3114-ve',

    'p1365 mk ii': 'https://www.axis.com/products/axis-p1365',
    'p1365 mkii': 'https://www.axis.com/products/axis-p1365',
    'p1405-le mk ii': 'https://www.axis.com/products/axis-p1405-le',
    'p1425-le mk ii': 'https://www.axis.com/products/axis-p1425-le',
    'p3224-v mk ii': 'https://www.axis.com/products/axis-p3224-v',
    'p3225-lv mk ii': 'https://www.axis.com/products/axis-p3225-lv',
    'p3225-v mk ii': 'https://www.axis.com/products/axis-p3225-v',
    'p3363': 'https://www.axis.com/products/axis-p3363-v',
    'p3364': 'https://www.axis.com/products/axis-p3364-v',
    'p3365': 'https://www.axis.com/products/axis-p3365-v',
    'p3367': 'https://www.axis.com/products/axis-p3367-v',
    'p3905-r mk ii': 'https://www.axis.com/products/axis-p3905-r',
    'p5624-e-mkii': 'https://www.axis.com/products/axis-p5624-e',

    'q1615 mk ii': 'https://www.axis.com/products/axis-q1615-e',
    'q3505': 'https://www.axis.com/products/axis-q3505-v',
    'q3517': 'https://www.axis.com/products/axis-q3517-lv',
    'q3617': 'https://www.axis.com/products/axis-q3617-ve',
    'q3709 (center)': 'https://www.axis.com/products/axis-q3709-pve',
    'q3709 (left)': 'https://www.axis.com/products/axis-q3709-pve',
    'q3709 (right)': 'https://www.axis.com/products/axis-q3709-pve',
    'q3709-pve (center)': 'https://www.axis.com/products/axis-q3709-pve',
    'q3709-pve (left)': 'https://www.axis.com/products/axis-q3709-pve',
    'q3709-pve (right)': 'https://www.axis.com/products/axis-q3709-pve',
    'q6045-e-mkii': 'https://www.axis.com/products/axis-q6045',

    't8516': 'https://www.axis.com/products/axis-t8516-poe-network-switch',
};

const modelNumberToIconExceptions: { [key: string]: string } = {
    '212 ptz': '212',
    '215 ptz': '215-ptz',
    '243sa': '243sa-video-server',

    'a8004-ve': 'a8004_0',
    'a9188/-ve': 'a9188-ve',

    'c1004-e': 'c1004-e-network-cabinet-speaker',
    'c cube l': 'companion-cube-l',

    'f34': 'f34-main-unit_0',
    'f44': 'f44-dual-audio-input_0',
    'fa54': 'fa54-main-unit',

    'm1045-lw': 'axis-m1045-lw',
    'm2026-le-mkii': 'm2026-le-mk-ii',
    'm2026-le mk ii': 'm2026-le-mk-ii',
    'm3004': 'm3004-v',
    'm3005': 'm3005-v',
    'm3006': 'm3006-v',
    'm3007': 'm3007-p',
    'm3024': 'm3024-lve',
    'm3025': 'm3025-ve',
    'm3026': 'm3026-ve',
    'm3027': 'm3027-pve',
    'm3037': 'm3037-pve',
    'm3046': 'm3046-v',
    'm3046-1-8mm': 'm3046-v',
    'm3058': 'm3058plve-ceiling-1711-hi',
    'm3106-lve mk ii': 'm3106-lve',
    'm3106-l-mkii': 'm3106-l',
    'm3114': 'm3114-ve',
    'm7014': 'M7014',

    'p1365 mkii': 'p1365-mk-ii',
    'p1346': 'p1346_0',
    'p1367': 'p1367wallangle',
    'p1405-le mk ii': 'p1405-le_0',
    'p1445-le-3': 'p1445le3',
    'p3224-v mk ii': 'p3214-v_0',
    'p3225-lv mk ii': 'p3225-lv',
    'p3225-v mk ii': 'p3215-v',
    'p3363': 'p3363-v',
    'p3364': 'p3364-ve',
    'p3365': 'p3365-v',
    'p3367': 'p3367-v',
    'p3384': 'p3384-v',
    'p5624-e-mkii': 'p5624-e',
    'p5635-e': 'p5635-e_0',
    'p8221': 'p8221-io-audio-module',

    'q1615 mk ii': 'q1615e-mkii-wall-angle-left',
    'q1921': 'q1921_0',
    'q3505': 'q3505-v-mkii',
    'q3517': 'q3517-lv-ceiling-front',
    'q3617': 'q3617-ve',
    'q3709': 'q3709-pve_2',
    'q6000-e': 'q6000-e-mkii',
    'q6045-e-mkii': 'q6045',
    'q7406': 'q7406-blade',
    'q7414': 'q7414-blade',
    'q7436': 'q7436-blade',
    'q8414-lvs': 'q8414lvs_512',

    't8516': 't8516-poe-network-switch',
    't8705': 'decoder-t8705-front-angle-left',
};
