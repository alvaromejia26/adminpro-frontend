import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public _us: UsuarioService, public router: Router) {}

  canActivate() {
    if (this._us.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por el ADMIN GUARD');
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
