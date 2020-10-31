import { UserDataService } from 'src/app/core/services/user-data.service';
import { UserOverviewResolver } from './user-overview.resolver';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

const routers: Routes = [
  { path: '', component: UsersComponent },
  {
    path: ':id', component: UserProfileComponent,
    resolve: { user: UserOverviewResolver }
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routers)
  ],
  exports: [RouterModule],
  providers: [UserOverviewResolver, UserDataService]
})
export class UsersRoutingModule { }
