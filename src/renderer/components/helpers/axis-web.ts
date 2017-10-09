export function productPageUrl(modelName: string | undefined): string {
    if (modelName === undefined) {
        return 'https://www.axis.com/products-and-solutions';
    }

    modelName = modelName.replace(' ', '-').toLowerCase();
    return `https://www.axis.com/products/${modelName}`;
}

export function iconUrl(modelNumber: string | undefined): string {
    if (modelNumber === undefined) {
        return '';
    }

    modelNumber = modelNumber.toLowerCase();
    return `https://www.axis.com/images/scaled/300/sites/default/files/${modelNumber}.png`;
}
