import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopService } from "./services/topservice/top.service";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSortModule } from "@angular/material/sort";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatSliderModule } from "@angular/material/slider";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { PortalModule } from "@angular/cdk/portal";
import { A11yModule } from "@angular/cdk/a11y";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { DeckCompareComponent } from './views/deck/compare/deck-compare.component';
import { InfoComponent } from './views/deck/info/info.component';
import { CardsComponent } from './views/deck/cards/cards.component';
import { RelicsComponent } from './views/deck/relics/relics.component';
import { PotionsComponent } from './views/deck/potions/potions.component';
import { NeowComponent } from './views/deck/neow/neow.component';
import {CardService} from "./services/card-service/card.service";
import {BundleService} from "./services/bundle-service/bundle.service";
import {DisplayObjectService} from "./services/display-object-service/display-object.service";
import {InfoService} from "./services/info-service/info.service";
import {RunLogService} from "./services/run-log-service/run-log.service";
import { RunsComponent } from './views/runs/runs/runs.component';
import { RunViewerComponent } from './views/runs/run-details/run-viewer.component';
import { RunCountCountryComponent } from './views/info/run-count-country/run-count-country.component';
import { StatsComponent } from './views/info/stats/stats.component';
import { CardListComponent } from './views/mods/card-list/card-list.component';
import { RelicListComponent } from './views/mods/relic-list/relic-list.component';
import { PotionListComponent } from './views/mods/potion-list/potion-list.component';
import { CardLookupComponent } from './views/info/card-lookup/card-lookup.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/runs/All',
    pathMatch: 'full'
  },
  {
    path: 'compare',
    component: DeckCompareComponent
  },
  {
    path: 'info/run-count-country',
    component: RunCountCountryComponent
  },
  {
    path: 'info/decks/:deck',
    component: InfoComponent
  },
  {
    path: 'cards/:deck',
    component: CardsComponent
  },
  {
    path: 'relics/:deck',
    component: RelicsComponent
  },
  {
    path: 'potions/:deck',
    component: PotionsComponent
  },
  {
    path: 'neow/:deck',
    component: NeowComponent
  },
  {
    path: 'runs/:type',
    component: RunsComponent
  },
  {
    path: 'runs/:type/:secondType',
    component: RunsComponent
  },
  {
    path: 'runs/:type/:secondType/:hofType',
    component: RunsComponent
  },
  {
    path: 'run-view/:id',
    component: RunViewerComponent
  },
  {
    path: 'cardLookup/:card',
    component: CardLookupComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DeckCompareComponent,
    InfoComponent,
    CardsComponent,
    RelicsComponent,
    PotionsComponent,
    NeowComponent,
    RunsComponent,
    RunViewerComponent,
    RunCountCountryComponent,
    StatsComponent,
    CardListComponent,
    RelicListComponent,
    PotionListComponent,
    CardLookupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    PortalModule,
  ],
  providers: [TopService, CardService, BundleService, DisplayObjectService, InfoService, RunLogService],
  bootstrap: [AppComponent]
})

export class AppModule { }
