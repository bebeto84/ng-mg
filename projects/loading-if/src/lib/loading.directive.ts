import {Directive, ComponentFactory, ComponentRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, Input} from '@angular/core';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {LoadingErrorComponent} from './loading-error/loading-error.component';

export class LoadingContext {
    public $implicit: any = null;
}

/**
 * Structural directive that conditionally includes the LoadingSpinnerComponent based on the value of an expression
 * transformed to Boolean.
 *
 *
 * */
@Directive({
    selector: '[ngMgLoadingIf]'
})
export class LoadingDirective {
    private context: LoadingContext = new LoadingContext();
    private errorMessage: string | null = null;
    private error: boolean | null = null;
    private containerClass: string | string [] | null = null;

    private readonly loadingFactory: ComponentFactory<LoadingSpinnerComponent>;
    private readonly loadingErrorFactory: ComponentFactory<LoadingErrorComponent>;

    private spinnerComponent: ComponentRef<LoadingSpinnerComponent>;
    private errorComponent: ComponentRef<LoadingErrorComponent>;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
        // Create resolver for loading component
        this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingSpinnerComponent);
        this.loadingErrorFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingErrorComponent);
    }

    /**
     * The Boolean expression to evaluate as the condition for showing a template.
     * It is also initialize the $implicit property
     *
     * Examples usage
     *
     * ```
     * <div *ngMgLoadingIf="data"> ... </div>
     * <div *ngMgLoadingIf="data$ | async"> ... </div>
     * <div *ngMgLoadingIf="data$ | async; let myData"> ... </div>
     * ```
     *
     */
    @Input()
    set ngMgLoadingIf(condition: any) {
        this.context.$implicit = condition;
        this.updateView();
    }

    /**
     * The `containerClass` param could have classes to be appended to the LoadingSpinnerComponent
     * While LoadingSpinnerComponent is shown, the classes will be attached to it.
     *
     * @param containerClass
     *
     * Example usage - It will set margin on top and bottom as 5rem
     *
     * ```
     * <div *ngMgLoadingIf="data; containerClass:'my-5'"> ... </div>
     * ```
     */
    @Input()
    set ngMgLoadingIfContainerClass(containerClass: string | string[] | null) {
        this.containerClass = containerClass;
        this.updateLoadingComponent();
    }

    /**
     * Will show the LoadingError component if `error` parameter is true.
     *
     * @param hasError
     *
     * Example usage - The boolean variable ``errorHappened``will determine if the LoadingError component is shown.
     *
     * ```
     * <div *ngMgLoadingIf="data; error:errorHappened'"> ... </div>
     * ```
     */
    @Input()
    set ngMgLoadingIfError(hasError: boolean) {
        this.error = hasError;
        this.updateView();
    }

    /**
     * The `errorMessage` parameter holds the error message that will appear into the LoadingError component
     *
     * @param errorMessage
     *
     * Example usage - If `error` is true, the `errorKey` set will be 'parent.component.key-to-translate'
     *
     * ```
     * <div *ngMgLoadingIf="data; error:errorHappened; errorMessage: 'parent.component.key-to-translate' | translate"> ... </div>
     * ```
     */
    @Input()
    set ngMgLoadingIfErrorMessage(errorMessage: string) {
        this.errorMessage = errorMessage;
        this.updateErrorComponent();
    }

    private updateView(): void {
        this.viewContainerRef.clear();
        if (!this.context.$implicit) {
            if (!this.error) {
                this.spinnerComponent = this.viewContainerRef.createComponent(this.loadingFactory);
            } else {
                this.errorComponent = this.viewContainerRef.createComponent(this.loadingErrorFactory);
            }
        } else {
            // embed the contents of the host template & set the context
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
        }
    }

    private updateLoadingComponent(): void {
        if (this.spinnerComponent && this.containerClass) {
            this.spinnerComponent.instance.containerClass = this.containerClass;
        }
    }

    private updateErrorComponent(): void {
        if (this.errorComponent && this.errorMessage) {
            this.errorComponent.instance.message = this.errorMessage;
        }
    }
}
