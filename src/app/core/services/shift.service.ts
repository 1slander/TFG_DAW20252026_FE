import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { ShiftInterface } from '../../interfaces/shift';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  private http = inject(HttpClient);

  getAllShifts() {
    return this.http.get<ShiftInterface[]>(`${environment.apiUrl}shifts`);
  }
}
