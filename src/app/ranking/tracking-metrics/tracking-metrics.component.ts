import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kongtrac-tracking-metrics',
  templateUrl: './tracking-metrics.component.html',
  styleUrls: ['./tracking-metrics.component.scss']
})
export class TrackingMetricsComponent implements OnInit {
  @Input() gameCount: number;
  @Input() playerCount: number;
  @Input() killScreenCount: number;
  @Input() eventCount: number;

  constructor() {}

  ngOnInit() {}
}
