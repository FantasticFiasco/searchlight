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
        modelNumber = (modelNumberToProductPageExceptions[modelNumber] || modelNumber).replace(/ /, '-');
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
    '212 ptz': '212',
    '215 ptz': '215',
    '216fd': '216',
    '243q(1) blade': '243q',
    '243q(2) blade': '243q',
    '243q(3) blade': '243q',
    '243q(4) blade': '243q',

    'a9188/-ve': 'a9188-ve',

    'm3004': 'm3004-v',
    'm3005': 'm3005-v',
    'm3006': 'm3006-v',
    'm3007': 'm3007-p',
    'm3024': 'm3024-lve',
    'm3025': 'm3025-ve',
    'm3027': 'm3027-pve',
    'm3037': 'm3037-pve',
    'm3046': 'm3046-v',
    'm3106-l-mkii': 'm3106-l mk-ii',
    'm3114': 'm3114-ve',

    'p1365 mk ii': 'p1365',
    'p1365 mkii': 'p1365',
    'p1405-le mk ii': 'p1405-le',
    'p1425-le mk ii': 'p1425-le',
    'p3224-v mk ii': 'p3224-v',
    'p3225-lv mk ii': 'p3225-lv',
    'p3225-v mk ii': 'p3225-v',
    'p3363': 'p3363-v',
    'p3364': 'p3364-v',
    'p3365': 'p3365-v',
    'p3367': 'p3367-v',
    'p3905-r mk ii': 'p3905-r',
    'p5624-e-mkii': 'p5624-e',

    'q3505': 'q3505-v',
    'q3517': 'q3517-lv',
    'q3617': 'q3617-ve',
    'q3709 (center)': 'q3709-pve',
    'q3709 (left)': 'q3709-pve',
    'q3709 (right)': 'q3709-pve',
    'q3709-pve (center)': 'q3709-pve',
    'q3709-pve (left)': 'q3709-pve',
    'q3709-pve (right)': 'q3709-pve',
    'q6045-e-mkii': 'q6045',
};

const modelNumberToIconExceptions: { [key: string]: string } = {
    '212 ptz': '212',
    '215 ptz': '215-ptz',
    '243sa': '243sa-video-server',

    'a8004-ve': 'a8004_0',
    'a9188/-ve': 'a9188-ve',

    'c1004-e': 'c1004-e-network-cabinet-speaker',

    'f34': 'f34-main-unit_0',
    'f44': 'f44-dual-audio-input_0',
    'fa54': 'fa54-main-unit',

    'm1045-lw': 'axis-m1045-lw',
    'm1054': 'M1054',
    'm2026-le-mkii': 'm2026-le-mk-ii',
    'm2026-le mk ii': 'm2026-le-mk-ii',
    'm3004': 'm3004-v',
    'm3005': 'm3005-v',
    'm3006': 'm3006-v',
    'm3007': 'm3007-p',
    'm3024': 'm3024-lve',
    'm3025': 'm3025-ve',
    'm3027': 'm3027-pve',
    'm3037': 'm3037-pve',
    'm3046': 'm3046-v',
    'm3106-lve mk ii': 'm3106-lve',
    'm3106-l-mkii': 'm3106-l',
    'm3114': 'm3114-ve',
    'm3204': 'M3204',
    'm7014': 'M7014',

    'p1365 mkii': 'p1365-mk-ii',
    'p1346': 'p1346_0',
    'p1405-le mk ii': 'p1405-le_0',
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

    't8705': 'decoder-t8705-front-angle-left',
};
