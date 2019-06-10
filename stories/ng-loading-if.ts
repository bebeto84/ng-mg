import { storiesOf, moduleMetadata } from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {LoadingModule} from '../libs/loading-if/src/lib/loading.module';
import { Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ng-mg-loading-component',
  template: `
      <ng-container *ngMgLoadingIf="isLoading$ | async">
          <ng-content></ng-content>
      </ng-container>
  `
})
export class LoadingComponent implements OnInit {
 public isLoading$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoading$ = of(false)
      .pipe(
        delay(5000),
        map((value) => true)
      );
  }
}

storiesOf('LoadingIf', module)
.addDecorator(
  moduleMetadata({
    declarations: [LoadingComponent],
    imports: [CommonModule, LoadingModule],
  }),
)
 .add('with boolean value', () => ({
   template: `
    <div *ngMgLoadingIf="!isLoading">
      <span>Content loaded</span>
    </div>`,
    props: {
      isLoading: true,
    },
  }))
  .add('with Observable that changes after 5 seconds', () => ({
    template: `
    <ng-mg-loading-component>
      <span>Observable fininish and content is loaded</span>
    </ng-mg-loading-component>`,
    props: {
    },
  }));




