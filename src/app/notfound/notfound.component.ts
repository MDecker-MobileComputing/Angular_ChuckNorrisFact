import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mide-notfound',
  templateUrl: './notfound.component.html',
  styles: [
  ],
})
export class NotfoundComponent {

  /**
   * Constructor for dependency injection.
   *
   * @param router  Needed to read current route; must be public, so it can be accessed
   *                via interpolation in HTML.
   */
  constructor(public router: Router) { }

}
