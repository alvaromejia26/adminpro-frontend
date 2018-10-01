import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando: boolean = true;
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(public _hs: HospitalService, public _mus: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._mus.notificacion.subscribe(resp => this.cargarHospitales());
  }

  mostrarModal(id: string) {
    this._mus.mostrarModal('hospitales', id);
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

  crearHospital() {
    swal({
      title: 'Crear hospital nuevo',
      text: 'Ingrese el nombre del hospital a crear',
      content: 'input',
      buttons: ['Cancelar', 'Guardar']
    }).then(nombre => {
      if (nombre) {
        const hospital = new Hospital(
          nombre
        );
        this._hs.crearHospital(hospital).subscribe(() => this.cargarHospitales());
      }
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this._hs.cargarHospitales(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospital (termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hs.buscarHospitales(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hs.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: ['No', 'Si'],
      dangerMode: true
    }).then(borrar => {
      console.log(borrar);
      if (borrar) {
        this._hs.borrarHospital(hospital._id).subscribe((borrado: boolean) => {
          this.cargarHospitales();
        });
      }
    });
  }

}
