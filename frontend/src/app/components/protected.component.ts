import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-protected',
  templateUrl: 'protected.component.html',
})
export class ProtectedComponent implements OnInit {
  data: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getProtectedData()
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.error('Not Authorized');
          }
          return of(null);
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }
}
