import { Component, OnInit } from '@angular/core';
import { ExternalapiService } from '../../externalapi.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  abouts: any = [];
  constructor(private externalapiService: ExternalapiService) { }

  ngOnInit() {
      this.externalapiService.getFeedback().subscribe((data:any)=>{
      this.abouts = data.payload.data;
    });
  }

}
