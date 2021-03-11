import { Component, OnInit, EventEmitter, Input  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-generalemail',
  templateUrl: './generalemail.component.html',
  styleUrls: ['./generalemail.component.css']
})
export class GeneralemailComponent {
  myForm: FormGroup | any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }
  // tslint:disable-next-line:typedef
  private createForm() {
    this.myForm = this.formBuilder.group({
      name: '',
      email: '',
      message: ''
    });
  }

  // tslint:disable-next-line:typedef
  public submitForm() {
    this.activeModal.close(this.myForm.value);
  }

  // tslint:disable-next-line:typedef
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
