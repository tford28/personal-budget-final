import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './register/login/login.component';
import { SignupComponent } from './register/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './budget/register/register.component';
import { ViewComponent } from './budget/view/view.component';
import { UpdateComponent } from './budget/update/update.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
  },
  {
    path: 'register',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addbudget',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewbudget',
    component: ViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'updatebudget',
    component: UpdateComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    RegisterComponent,
    ViewComponent,
    UpdateComponent,
    HeaderComponent,
    FooterComponent,
    BarComponent,
    PieComponent,
    ScatterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
