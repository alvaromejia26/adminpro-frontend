import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _us: UsuarioService, public _mus: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._mus.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._mus.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._us.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario (termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._us.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._us.actualizarUsuario(usuario).subscribe();
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._us.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      console.log(borrar);
      if (borrar) {
        this._us.borrarUsuario(usuario._id).subscribe((borrado: boolean) => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });
  }

}
