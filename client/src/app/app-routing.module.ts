import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExecutiveComponent } from './components/executive/executive.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'register', component: RegisterComponent},
    {path: 'executive', component: ExecutiveComponent},
    {path: '**', component: HomeComponent}
]

@NgModule({
    declarations: [],
    imports: [RouterModule, RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  