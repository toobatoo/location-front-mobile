import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDCDrawer } from "@material/drawer";
import { MDCList } from "@material/list";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCRipple } from '@material/ripple';
import { MDCDialog } from '@material/dialog';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  public drawer;
  public list;
  public iconButtonRipple;
  public dialog;

  constructor(private router: Router) { }

  ngOnInit() {
    this.initDrawer();
  }

  initDrawer() {
    this.list = MDCList.attachTo(document.querySelector('.mdc-list'));
    this.drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    this.list.wrapFocus = true;
    const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
    topAppBar.setScrollTarget(document.getElementById('main-content'));

    topAppBar.listen('MDCTopAppBar:nav', () => {
      this.drawer.open = !this.drawer.open;
    });
    this.iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
    this.iconButtonRipple.unbounded = true;
    this.dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
  }

  link(url) {
    var router = this.router;
    this.drawer.open = false;
    setTimeout(function () {
      router.navigateByUrl(url);
    }, 1000);
  }

}
