import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(private activatedRouted: ActivatedRoute, private http: HttpClient) {
    activatedRouted.params.subscribe(params => {
      const termino = params['termino'];
      this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe(resp => {
      console.log(resp);
      this.hospitales = resp['hospitales'];
      this.medicos = resp['medicos'];
      this.usuarios = resp['usuarios'];
    });
  }

}
