import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExecutiveComponent } from './components/executive/executive.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StandardComponent } from './components/standard/standard.component';
import { SuiteComponent } from './components/suite/suite.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'executive', component: ExecutiveComponent},
    { path: 'suite', component: SuiteComponent },
    { path: 'standard', component: StandardComponent},
    { path: '**', component: HomeComponent}
]

@NgModule({
    declarations: [],
    imports: [RouterModule, RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  