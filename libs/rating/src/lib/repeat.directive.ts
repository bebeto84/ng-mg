import {Directive, TemplateRef, ViewContainerRef, ComponentFactoryResolver, Input, NgIterable, EmbeddedViewRef} from '@angular/core';

export class NgMgRepeatContext {
    constructor(
        public $implicit: number, public index: number = 0) {}
}

@Directive({
    selector: '[ngMgRepeat]'
})
export class RepetDirective {

    private context: NgMgRepeatContext;
    private repeatTimes = 0;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }


    @Input()
    set ngMgRepeat(times: number) {
        this.repeatTimes = times;
        this.updateView();
    }

    private updateView(): void {
        this.viewContainerRef.clear();
        if (this.repeatTimes) {
            // embed the contents of the host template & set the context
            for (let i = 0; i < this.repeatTimes; i++) {
                this.viewContainerRef.createEmbeddedView(this.templateRef, new NgMgRepeatContext(this.repeatTimes, i), i);
            }
        }

    }
}

