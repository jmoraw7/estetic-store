import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminForm = new FormGroup({
    key: new FormControl('', Validators.required)
  });
  from = 'home';
  id: any;
  constructor(
  	private router: Router,
  	private _Activatedroute: ActivatedRoute,
  ) { 
    this.from = this._Activatedroute.snapshot.paramMap.get("from");
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
  }

  login(form) {
  	if(form.key !== '!*esteticstore*!') {
  		alert('¡Credenciales inválidas!')	
  	} else {
  		localStorage.setItem('admin', btoa('!*esteticstore*!'));
  		this.goTo();
  	}
  }

  goTo() {
    if(this.from == 'home') {
      this.router.navigate(['products']);
    } else {
    this.router.navigate(['product/' + this.id]);
    }
  }

}
