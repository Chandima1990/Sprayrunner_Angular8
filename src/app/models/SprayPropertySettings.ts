export class SprayPropertySettings {

    /**
     * 
     * @param SPS 
     */
    constructor(SPS) {
        {
            this.Id = SPS.Id;
            this.busrid = SPS.busrid;
            this.name = SPS.name;
            this.userrid = SPS.userrid;
        }
    }

    Id: string;
    userrid: string;
    busrid: number;
    name: string;
}