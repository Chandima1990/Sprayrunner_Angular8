export class Paddock{

    /**
     * 
     * @param paddock 
     */
    constructor(paddock)
    {
        {
            this.Id = paddock.Id;
            this.SprayPropertySettingsId = paddock.SprayPropertySettingsId;
            this.name = paddock.name;
            this.area = paddock.area;
            this.parameter = paddock.parameter;
        }
    }

    Id:string;
    SprayPropertySettingsId:string;
    name: string;
    area: number;
    parameter: string;
}