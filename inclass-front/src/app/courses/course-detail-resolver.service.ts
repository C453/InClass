import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../services/auth.service";
import { Angular2TokenService } from "angular2-token";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable()
export class CourseDetailResolverService implements Resolve<any> {
  constructor(public authTokenService: Angular2TokenService,
    public authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
      console.log(route.params['id']);
      return this.authTokenService.get('courses/' + route.params['id'], {})
    }
}
