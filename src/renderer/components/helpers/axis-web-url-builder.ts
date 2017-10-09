export class AxisWebUrlBuilder {
    /**
     * Initializes a new instance of the class.
     * @param modelNumber the model number
     */
    constructor(
        private readonly modelName: string | undefined,
        private readonly modelNumber: string | undefined) {
    }

    public buildProductPageUrl(): string {
        if (this.modelName === undefined) {
            return 'https://www.axis.com/products-and-solutions';
        }

        const modelName = this.modelName.replace(' ', '-').toLowerCase();
        return `https://www.axis.com/products/${modelName}`;
    }

    public buildIconUrl(): string | undefined {
        if (this.modelNumber === undefined) {
            return undefined;
        }

        const modelNumber = this.modelNumber.toLowerCase();
        return `https://www.axis.com/images/scaled/300/sites/default/files/${modelNumber}.png`;
    }
}
