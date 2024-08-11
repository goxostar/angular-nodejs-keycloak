import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/protected';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {}

  getProtectedData(): Observable<any> {
    return from(
      this.keycloakService.getToken().then((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get(this.apiUrl, { headers }).toPromise();
      })
    );
  }
}
