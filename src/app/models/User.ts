export class User {
    /**
     * 
     * @param user 
     */
    constructor(user) {
        {
            this.TenantName = user.TenantName;
            this.AccountType = user.AccountType;
            this.address1 = user.address1;
            this.address2 = user.address2;
            this.cresditcardno = user.cresditcardno;
            this.cresditcardtype = user.cresditcardtype;
            this.expirydate = user.expirydate;
            this.Securitycode = user.Securitycode;
            this.phone = user.phone;
            this.ID = user.ID;
            this.FirstName = user.FirstName;
            this.MiddleName = user.MiddleName;
            this.LastName = user.LastName;
            this.Email = user.Email;
            this.AuthKey = user.AuthKey;
            this.IsAdmin = user.IsAdmin;
            this.Password = user.Password;
            this.ConPassword = user.ConPassword;
            this.CurrentPassword = user.CurrentPassword;
            this.dateofbirth = user.dateofbirth;
            this.gender = user.gender;
            this.TFA = user.TFA;
            this.rememberme = user.rememberme;
        }
    }

    TenantName: string;
    AccountType: string;
    address1: string;
    address2: string;
    cresditcardno: string;
    cresditcardtype: string;
    expirydate: string;
    Securitycode: string;
    phone: string;
    ID: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Email: string;
    AuthKey: string;
    IsAdmin: boolean;
    Password: string;
    ConPassword: string;
    CurrentPassword: string;
    dateofbirth: string;
    gender: string;
    TFA: string;
    rememberme: boolean;



}

export interface UserList {
    UserList: User[];
}