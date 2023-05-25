import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientService {
  async getAll() {
    return await (await fetch('/assets/data.json')).json();
  }
}
