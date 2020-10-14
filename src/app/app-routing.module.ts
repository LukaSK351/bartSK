import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './components/gallery-list/main.component';
import {ImageListComponent} from './components/image-list/image-list.component';
import {AllComponent} from './components/header/all.component';


const routes: Routes = [
  { path: '', component: AllComponent },
  { path: 'gallery', children: [
      {path: ':', component: ImageListComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
