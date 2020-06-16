// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mockLoadingDelay: 2000,
  auth0: {
    client_id: 'puQtRIcEVSuhKvTdxmqagyVHIVb74R4p',
    domain: 'candela.eu.auth0.com',
    logout_url: 'http://localhost:4200',
    redirect_uri: 'http://localhost:4200',
    audience: 'https://candela.eu.auth0.com/api/v2/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
