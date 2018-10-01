import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient, private _us: UsuarioService) { }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map( (resp: any) => resp.medicos));
  }

  cargarMedicos(desde: number = 0) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url);
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.medico));
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    if (medico._id) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this._us.token;
      return this.http.put(url, medico).pipe(map((resp: any) => {
        swal('Medico actualizado', resp.medico.nombre, 'success');
        return resp.medico;
      }));
    } else {
      // Creando
      url += '?token=' + this._us.token;
      return this.http.post(url, medico).pipe(map((resp: any) => {
        swal('Medico creado', resp.medico.nombre, 'success');
        return resp.medico;
      }));
    }
  }

  borrarMedico (id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._us.token;
    return this.http.delete(url).pipe(map(resp => {
      swal('Médico borrado', 'El Médico ha sido eliminado correctamente', 'success');
      return true;
    }));
  }
}
