import { Component, OnInit } from '@angular/core';
import { feedbacks } from '../../feedbacks';
import * as $ from 'jquery';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks = feedbacks;
  constructor() { }

  ngOnInit(): void {  }

}
