import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ng-mg-rating',
  templateUrl: './rating.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit {

  @Input() score: number;
  constructor() { }

  ngOnInit() {
  }

}
