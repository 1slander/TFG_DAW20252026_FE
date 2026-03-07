import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TableResponseInterface } from '../../interfaces/table';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private tablesList: TableResponseInterface[] = [];

  getTables() {
    return this.http.get<TableResponseInterface[]>(`${environment.apiUrl}tables`);
  }
}
