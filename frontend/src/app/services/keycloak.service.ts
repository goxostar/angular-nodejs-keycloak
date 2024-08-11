import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class KeycloakInitService {
  constructor(private keycloak: KeycloakService) {}

  init(): Promise<void> {
    return this.keycloak
      .init({
        config: {
          url: 'http://localhost:8080/',
          realm: 'goxoTestRealm',
          clientId: 'goxo-test-client1',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
        bearerExcludedUrls: [],
      })
      .then(() => {})
      .catch((error) => {
        console.error('Keycloak init failed', error);
        return Promise.reject(error);
      });
  }
}
