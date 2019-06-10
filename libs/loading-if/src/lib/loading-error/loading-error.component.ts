import {Component, OnInit, Input} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'ng-mg-loading-error',
    templateUrl: './loading-error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingErrorComponent implements OnInit {
    /**
     * The message to be shown when loading has error
     */
    @Input() message: string;

    private defaultErrorKey = 'Error while loading';

    constructor() {
    }

    ngOnInit() {
        this.message = this.message ? this.message : this.defaultErrorKey;
    }

}
