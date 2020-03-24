export class Product {
    /**
     * 
     * @param product 
     */
    constructor(product) {
        {
            this.ID = product.Id;
            this.ProductName = product.ProductName;
            this.Amount = product.Amount;
            this.Volume = product.Volume;
            this.Area = product.Area;
            this.PresetPropID = product.PresetPropID;
            this.PresetID = product.PresetID;
            this.ProductID = product.ProductID;
        }
    }

    
    ID: string;
    ProductName:string;
    ProductID:string;
    Amount:string;
    Volume:string;
    Area:string;
    PresetPropID:string;
    PresetID:string;


}
