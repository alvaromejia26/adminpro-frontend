import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() data: any;
  @Input() labels: any;
  @Input() chartType: any;

  constructor() { }

  ngOnInit() {
  }

}
