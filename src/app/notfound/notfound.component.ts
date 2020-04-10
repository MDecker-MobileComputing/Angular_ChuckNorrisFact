import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


/**
 * Custom component to be shown when component requested from router is not found.
 * When served via web server then 404 page of sever will be shown instead?
 */
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
