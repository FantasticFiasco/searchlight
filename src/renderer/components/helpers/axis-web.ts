/**
 * Returns the product page URL on www.axis.com.
 * @param modelName the model name
 */
export function productPageUrl(modelName: string | undefined): string {
    if (modelName === undefined) {
        return 'https://www.axis.com/products-and-solutions';
    }

    modelName = (modelNameExceptions[modelName] || modelName).replace(' ', '-').toLowerCase();
    return `https://www.axis.com/products/${modelName}`;
}

/**
 * Returns the icon URL on www.axis.com.
 * @param modelNumber the model number
 */
export function iconUrl(modelNumber: string | undefined): string {
    if (modelNumber === undefined) {
        return '';
    }

    modelNumber = (modelNumberExceptions[modelNumber] || modelNumber).toLowerCase();
    return `https://www.axis.com/images/scaled/300/sites/default/files/${modelNumber}.png`;
}

const modelNameExceptions: { [key: string]: string } = {
    'AXIS M3005': 'AXIS M3005-V',
    'AXIS M3007': 'AXIS M3007-P',
    'AXIS M3025': 'AXIS M3025-VE',
    'AXIS P3367': 'AXIS P3367-V',
};

const modelNumberExceptions: { [key: string]: string } = {
    M3005: 'M3005-V',
    M3007: 'M3007-P',
    M3025: 'M3025-VE',
    P1346: 'P1346_0',
    P3367: 'P3367-V',
};
