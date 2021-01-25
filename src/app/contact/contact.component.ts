import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  id: any;
  message = '¡Hola!';
  constructor(
    private _Activatedroute: ActivatedRoute,
  ) {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.message = `¡Hola! Estoy interesado en este producto: https://esteticstore-ve.web.app/product/${this.id}`;
   }

  ngOnInit(): void {
  }

}
