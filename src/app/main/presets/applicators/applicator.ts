export class Applicator {
    /**
     * 
     * @param applicator 
     */
    constructor(applicator) {
        {
            this.Id = applicator.Id;
            this.userrid = applicator.userrid;
            this.username = applicator.username;
        }
    }

    
    Id: string;
    userrid:string;
    username:string;


}

export interface ApplicatorList {
    ApplicatorList: Applicator[];
}