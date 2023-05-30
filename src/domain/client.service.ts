import { Injectable } from '@angular/core';

import { ResponseDto } from './models';

@Injectable({ providedIn: 'root' })
export class ClientService {
  async getAll(): Promise<ResponseDto[]> {
    return await (await fetch('/assets/data.json')).json();
  }
}
