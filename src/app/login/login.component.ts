import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(public router: Router, public _us: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '487378775369-usqeqbjtl53078mfk1u76ouf32t06fj8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._us.loginGoogle(token).subscribe(() => window.location.href = '#/dashboard');
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._us.login(usuario, forma.value.recuerdame).subscribe(resp => {
      // console.log(resp);
      this.router.navigate(['/dashboard']);
    });
  }

}
