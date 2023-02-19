import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuardService],
    children: [
      {
        path: '', redirectTo: 'homepage', pathMatch: 'full'
      },
      {
        path: 'homepage',
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./core/components/user/user.module').then(m => m.UserModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
