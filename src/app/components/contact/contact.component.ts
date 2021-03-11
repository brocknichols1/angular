import {Component, OnInit, TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment.prod';
import {GeneralemailComponent} from '../forms/email/generalemail.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  closeResult = '';
  baseUrl: string = environment.apiUrl;
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  openGeneralEmailModal() {
    const modalRef = this.modalService.open(GeneralemailComponent);

    modalRef.result.then((data) => {
      const url = this.baseUrl + '/api/index.php/email';
      this.http.post(url,  data,
        {
          headers: {'Content-Type': 'application/json'}
        })
        .subscribe((result: any) => {
          alert(result.status.message);
        });

    }).catch((error) => {
      console.log(error);
    });
  }

}
