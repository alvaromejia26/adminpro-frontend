import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _hs: HospitalService, public _ms: MedicoService, private router: Router,
    public activatedRoute: ActivatedRoute, private _mus: ModalUploadService) {
      activatedRoute.params.subscribe(params => {
        const id = params['id'];
        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }
      });
    }

  ngOnInit() {
    this._hs.cargarHospitales().subscribe((hospitales: any) => this.hospitales = hospitales.hospitales);
    this._mus.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    });
  }

  cambioHospital(id: string) {
    this._hs.obtenerHospital(id).subscribe(hospital => this.hospital = hospital['hospital']);
  }

  cambiarFoto() {
    this._mus.mostrarModal('medicos', this.medico._id);
  }

  cargarMedico(id: string) {
    this._ms.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._ms.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

}
