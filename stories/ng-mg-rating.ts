import { storiesOf, moduleMetadata } from '@storybook/angular';
import {RatingModule} from '../libs/rating/src/lib/rating.module';
import {CommonModule} from '@angular/common';

storiesOf('Rating', module)
    .addDecorator(
        moduleMetadata({
            imports: [CommonModule, RatingModule],
        }),
        )
        .add('default', () => ({
        template: `
            <ng-mg-rating [score]="3">
            </ng-mg-rating>`,
        }));
