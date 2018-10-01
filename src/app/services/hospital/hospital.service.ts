import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, private _us: UsuarioService) { }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map( (resp: any) => resp.hospitales));
  }

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url);
  }

  crearHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._us.token;
    return this.http.post(url, hospital).pipe(map((resp: any) => {
      swal('Hospital creado', resp.hospital.nombre, 'success');
      return resp.hospital;
    }));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._us.token;
    console.log(url);
    return this.http.put(url, hospital).pipe(map((resp: any) => {
      swal('Hospital actualizado', resp.hospital.nombre, 'success');
      return true;
    }));
  }

  borrarHospital (id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._us.token;
    return this.http.delete(url).pipe(map(resp => {
      swal('Hospital borrado', 'El Hospital ha sido eliminado correctamente', 'success');
      return true;
    }));
  }
}
