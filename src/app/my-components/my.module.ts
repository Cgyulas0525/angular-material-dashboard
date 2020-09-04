import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MyRoutes } from './my.routing';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AutoComponent } from './auto/auto.component';
import { KoltsegtipusComponent } from './koltsegtipus/koltsegtipus.component';
import { PartnerComponent } from './partner/partner.component';
import { SzamlaComponent } from './szamla/szamla.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MyRoutes),
    DemoMaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  declarations: [AutoComponent, KoltsegtipusComponent, PartnerComponent, SzamlaComponent]
})
export class MyModule { }
