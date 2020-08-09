import {
  Component,
  Input,
  SimpleChanges,
  ViewChild,
  OnChanges
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Game } from '../../shared/models/game.model';

@Component({
  selector: 'kongtrac-player-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.scss']
})
export class GamesTableComponent implements OnChanges {
  @Input() games: Game[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public dataSource = new MatTableDataSource<Game>();
  public displayedColumns: string[] = [
    'date',
    'score',
    'platform',
    'finalBoard'
  ];

  constructor() {}

  ngOnChanges(e: SimpleChanges) {
    console.log('games event', e.games);
    if (e.games) {
      this.dataSource.data = this.games;

      setTimeout(() => {
        this.dataSource.sort = this.sort;
      });
    }
  }

  onToggleChange(e: MatSlideToggleChange) {
    this.dataSource.data = this.games.filter(game => {
      if (e.checked) {
        return game.hasCompleteData;
      } else {
        return true;
      }
    });
  }
}

// TODO: Empty state.
