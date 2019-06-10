import {Component, Input, NgModule, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
import {Subject, of, Observable, throwError} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {By} from '@angular/platform-browser';
import {LoadingModule} from './loading.module';
import {CommonModule} from '@angular/common';

/**
 * Definition of stubbed classes used to Test the LoadingDirective
 * */
export abstract class ContainerLoadingDirectiveClass {
    abstract condition: any;
}

@Component({
    template: `
        <ng-container *ngMgLoadingIf="condition">
            <span id="not-loading"></span>
        </ng-container>
    `
})
export class ContainerBooleanComponent extends ContainerLoadingDirectiveClass {
    @Input() condition: boolean;
}

@Component({
    template: `
        <ng-container *ngMgLoadingIf="condition | async;containerClass: containerClass">
            <span id="not-loading"></span>
        </ng-container>
    `
})

export class ContainerObservableComponent extends ContainerLoadingDirectiveClass {
    @Input() condition: Subject<any> = new Subject<any>();
    @Input() containerClass: string;

}

@Component({
    template: `
        <ng-container *ngMgLoadingIf="condition;error: loadingError$ | async; errorMessage: errorKey">
            <span id="not-loading"></span>
        </ng-container>
    `
})
export class ContainerWithErrorComponent extends ContainerLoadingDirectiveClass implements OnInit {
    @Input() condition: boolean;
    @Input() errorKey: string;
    public loadingError$: Subject<boolean> = new Subject<boolean>();

    ngOnInit(): void {
        of(true)
            .pipe(
                switchMap(() => throwError('Forced error'))
            ).subscribe(() => this.condition = true, () => this.handleError());
    }

    private handleError(): Observable<any> {
        this.loadingError$.next(true);
        return of({});
    }
}

@NgModule({
    imports: [CommonModule, LoadingModule],
    declarations: [ContainerBooleanComponent, ContainerObservableComponent, ContainerWithErrorComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LoadingDirectiveTestModule {
    static getHostElement = (fixture, cssClass) => fixture.debugElement.query(By.css(cssClass));
    static getSpinner = (fixture) => fixture.debugElement.query(By.directive(LoadingSpinnerComponent));
}
