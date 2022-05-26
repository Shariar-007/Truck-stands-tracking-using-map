import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {BadUrlComponent} from "./shared/components/bad-url/bad-url.component";
import {TruckStandsComponent} from "./components/truck-stands/truck-stands.component";
import {AuthGuardGuard} from "./shared/guards/auth-guard.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'truck-stands', component: TruckStandsComponent, canActivate: [AuthGuardGuard]},
  {path: '**', component: BadUrlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
