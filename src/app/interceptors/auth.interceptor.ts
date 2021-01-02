import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {

          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }

        if (e.status === 403) {
          Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
          //this.router.navigate(['/clientes']);
        }
        if (e.status === 500) {
            console.log(e.error);
            if (e.error.error.indexOf('ConstraintViolationException') !== -1) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.error.mensaje
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Parece que algo ha ido mal!!! ${e.error.mensaje}`
              });
            }
          }
        return throwError(e);
      })
    );
  }
}