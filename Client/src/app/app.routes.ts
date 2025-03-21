import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MemberListComponent } from './members/members-list/members-list.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
      },
      {
        path: 'members/:username',
        component: MembersDetailComponent,
      },
      {
        path: 'member/edit',
        component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]
      },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'contact-us', component: ContactUsComponent },

  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
