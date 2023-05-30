import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResponseDto } from './models';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) {}

  async getAll(): Promise<ResponseDto[]> {
    return (await this.http.get<ResponseDto[]>('/assets/data.json').toPromise() ?? []);
  }
}
