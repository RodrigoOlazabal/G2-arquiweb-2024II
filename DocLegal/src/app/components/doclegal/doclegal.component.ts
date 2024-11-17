import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doclegal',
  templateUrl: './doclegal.component.html',
  styleUrls: ['./doclegal.component.css']
})
export class DoclegalComponent {
  constructor(public route:ActivatedRoute) {}
}
