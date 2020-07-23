import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../interfaces';

@Component({
  selector: 'ett-player-child',
  templateUrl: './player-child.component.html',
})
export class PlayerChildComponent {
  @Input() player: Player;
  @Output() emitItUp: EventEmitter<string> = new EventEmitter();

  showInfo() {
    this.emitItUp.emit('player ');
  }
}
