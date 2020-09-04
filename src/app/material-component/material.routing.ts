import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { MenuComponent } from './menu/menu.component';

export const MaterialRoutes: Routes = [
  {
    path: 'button',
    component: ButtonsComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  }
];
