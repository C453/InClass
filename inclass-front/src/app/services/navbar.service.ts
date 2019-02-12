import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  title: string;

  constructor() { this.title = "InClass" }
}
