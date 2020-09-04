import { Routes } from '@angular/router';

import { AutoComponent } from './auto/auto.component';
import { KoltsegtipusComponent } from './koltsegtipus/koltsegtipus.component';
import { PartnerComponent } from './partner/partner.component';
import { SzamlaComponent } from './szamla/szamla.component';

//import { MenuComponent } from './menu/menu.component';

export const MyRoutes: Routes = [
  { path: 'auto', component: AutoComponent },
  { path: 'koltsegtipus', component: KoltsegtipusComponent },
  { path: 'partner', component: PartnerComponent },
  { path: 'szamla', component: SzamlaComponent }
];
