import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ett-fund-two',
  templateUrl: './fund-two.component.html',
  styleUrls: ['./fund-two.component.scss'],
})
export class FundTwoComponent implements OnInit {
  users: string[] = ['Desi', 'Ivo'];
  positions: { name: string; isChief: boolean }[] = [
    { name: 'Maria', isChief: false },
    { name: 'Biser', isChief: true },
  ];
  isCool: boolean = true;

  constructor() {}

  ngOnInit() {}

  addUser(name: string) {
    this.users.push(name);
  }
}
