import { CommonName } from '../CommonName';

export class GroupedCommonNames {
    /**
     * 
     * @param group 
     */
    constructor(group) {
        {
            this.category = group.category;
            this.products = group.products;
        }
    }

    category: string;
    products: CommonName[]

}
