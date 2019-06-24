import { NgModule } from '@angular/core';
import { RatingComponent } from './rating.component';
import {RepetDirective} from './repeat.directive';

@NgModule({
  declarations: [RatingComponent, RepetDirective],
  imports: [
  ],
  exports: [RatingComponent, RepetDirective]
})
export class RatingModule { }
