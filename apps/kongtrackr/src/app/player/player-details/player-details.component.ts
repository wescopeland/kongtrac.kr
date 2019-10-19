import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kongtrac-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerDetailsComponent implements OnInit {
  @Input() arcadePersonalBest: number;
  @Input() mamePersonalBest: number;
  @Input() firstKillscreenDate: number;
  @Input() firstMillionDate: number;

  constructor() {}

  ngOnInit() {}
}
