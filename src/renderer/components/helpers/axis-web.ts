export function productPageUrl(modelName: string | undefined): string {
    if (modelName === undefined) {
        return 'https://www.axis.com/products-and-solutions';
    }

    return `https://www.axis.com/products/${adjustForModelNameExceptions(modelName)}`;
}

export function iconUrl(modelNumber: string | undefined): string {
    if (modelNumber === undefined) {
        return '';
    }

    modelNumber = modelNumber.toLowerCase();
    return `https://www.axis.com/images/scaled/300/sites/default/files/${modelNumber}.png`;
}

function adjustForModelNameExceptions(modelName: string): string {
    if (modelName === 'AXIS M3005') {
        modelName = 'AXIS M3005-V';
    } else if (modelName === 'AXIS M3007') {
        modelName = 'AXIS M3007-P';
    } else if (modelName === 'AXIS M3025') {
        modelName = 'AXIS M3025-VE';
    } else if (modelName === 'AXIS P3367') {
        modelName = 'AXIS P3367-V';
    }

    return modelName.replace(' ', '-').toLowerCase();
}
