import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtectedComponent } from './components/protected.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { KeycloakInitService } from './services/keycloak.service';
import { AuthGuard } from './guard/auth.guard';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

export function initializeKeycloak(keycloak: KeycloakInitService) {
  return (): Promise<void> => keycloak.init();
}

@NgModule({
  declarations: [AppComponent, ProtectedComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakInitService],
    },
    ApiService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
