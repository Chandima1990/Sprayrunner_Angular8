// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    apiURL: "https://xataapi.azurewebsites.net/",
    apiURLForLogin: "https://xataapi.azurewebsites.net/",
    Ocp_Apim_Subscription_Key: "0a8ecd9b068841859834cbfaf272a933",

    //configurable values
    siteNameVal: "https://sprayrunner-web.azurewebsites.net",//https://sprayrunner-web.azurewebsites.net//https://sprayrunner-admin.azurewebsites.net
    accountType: "Organisation",//Organisation//Tenant
    ApiKey: "$2a$10$8CX7cXOVGAHvdHLRYzxlWehQF7/S51jI3KmNBC4IlbT2h6sW0YB.e",
    ChatSecret : "WK8m7PUJRyQ.UpZ__iamwH5p4tS9P9lWdPwol-dMsgTFlKECcgOjMU0",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
