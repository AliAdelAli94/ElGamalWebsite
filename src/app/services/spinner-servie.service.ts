import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServieService {

  constructor() { }

  showSpinner(){
    document.getElementById('spinner').style.display = "block";
  }

  hideSpinner(){
    document.getElementById('spinner').style.display = "none";
  }
}
