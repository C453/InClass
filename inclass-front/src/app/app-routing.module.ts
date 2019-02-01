import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { CoursesComponent } from "./courses/courses.component";
import { AuthGuard } from "./guards/auth.guard";
import { CourseDetailComponent } from './courses/course-detail.component';
import { CourseDetailResolverService } from './courses/course-detail-resolver.service';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'courses',
      component: CoursesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'courses/:id',
      component: CourseDetailComponent,
      resolve: {
        cres: CourseDetailResolverService
      }
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CourseDetailResolverService]
})
export class AppRoutingModule { }