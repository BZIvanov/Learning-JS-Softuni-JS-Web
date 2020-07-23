import { Component } from '@angular/core';
import { Player } from '../../interfaces';

@Component({
  selector: 'ett-player-parent',
  templateUrl: './player-parent.component.html',
})
export class PlayerParentComponent {
  players: Player[] = [
    { name: 'Biser', goals: 3 },
    { name: 'Toni', goals: 2 },
  ];

  text: string = '';

  dataFromChild(idx: number, childText: string) {
    this.text = `${childText} index is ${idx}`;
  }
}
