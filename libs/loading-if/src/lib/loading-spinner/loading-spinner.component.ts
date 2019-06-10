import {Component, OnInit, Input} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'ng-mg-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent implements OnInit {

    @Input() containerClass: string | string [] = '';

    constructor() {
    }

    public ngOnInit(): void {
    }

}
