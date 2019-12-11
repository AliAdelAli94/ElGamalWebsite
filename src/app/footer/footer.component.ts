import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import { UserDTO } from '../models/UserDTO.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  userDto : UserDTO;

  constructor(public sharingDataService: SharingDataService, public router: Router) { 
    this.userDto = new UserDTO();
    
  }

  ngOnInit() {
  }


  navigateToMyaccountPage(id:number) {
    this.router.navigateByUrl('/default.aspx/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/default.aspx/my-account',id]));
  };

}
