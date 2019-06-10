import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {LoadingDirective} from './loading.directive';
import {LoadingErrorComponent} from './loading-error/loading-error.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

const DIRECTIVES = [
    LoadingDirective
];
const COMPONENTS = [
    LoadingSpinnerComponent,
    LoadingErrorComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    exports: [
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    entryComponents: [
        ...COMPONENTS
    ]
})
export class LoadingModule {
}
