import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', type: 'link', name: 'Vezérlő pult', icon: 'av_timer' },
  { state: 'koltsegtipus', type: 'link', name: 'Költség típus', icon: 'assignment' },
  { state: 'partner', type: 'link', name: 'Partner', icon: 'how_to_reg' },
  { state: 'auto', type: 'link', name: 'Auto', icon: 'drive_eta' },
  { state: 'szamla', type: 'link', name: 'Számla', icon: 'receipt' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
