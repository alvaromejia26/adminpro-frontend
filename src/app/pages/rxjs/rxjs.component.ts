import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      numero => console.log('Subs ', numero),
      error => console.error('Error en el obs: ', error),
      () => console.log('El observador terminó!!')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador
        };
        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio!!');
        // }
      }, 500);
    }).retry(2).map((resp: any) => resp.valor).filter((valor, index) => {
      if ((valor % 2) === 1) {
        // impar
        return true;
      } else {
        return false;
      }
    });
  }

}
