import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _ms: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
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
    this.cargarMedicos();
  }

  buscarMedico (termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this._ms.buscarMedicos(termino).subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  cargarMedicos() {
    this.cargando = true;
    this._ms.cargarMedicos(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.medicos = resp.medicos;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: ['No', 'Si'],
      dangerMode: true
    }).then(borrar => {
      console.log(borrar);
      if (borrar) {
        this._ms.borrarMedico(medico._id).subscribe((borrado: boolean) => {
          this.cargarMedicos();
        });
      }
    });
  }

}
