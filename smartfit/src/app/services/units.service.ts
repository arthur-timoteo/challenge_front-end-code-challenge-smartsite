import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitResponse } from '../types/unit-response';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  readonly _apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  constructor(private httpClient: HttpClient) { }

  getAllUnits(): Observable<UnitResponse> {
    return this.httpClient.get<UnitResponse>(this._apiUrl);
  }
}
