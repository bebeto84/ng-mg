import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import {
    LoadingDirectiveTestModule,
    ContainerLoadingDirectiveClass,
    ContainerBooleanComponent,
    ContainerObservableComponent,
    ContainerWithErrorComponent
} from './loading.directive.stub.spec';

import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {By} from '@angular/platform-browser';
import {LoadingErrorComponent} from './loading-error/loading-error.component';


describe('Directive: Loading', () => {
    let element: HTMLElement;
    let fixture: ComponentFixture<ContainerLoadingDirectiveClass>;
    let container: ContainerLoadingDirectiveClass;

    const getSpanElement = () => {
        fixture.detectChanges();
        return <HTMLSpanElement>element.querySelector('#not-loading');
    };
    const getLoadingSpinnerComponent = () => {
        fixture.detectChanges();
        return fixture.debugElement.query(By.directive(LoadingSpinnerComponent));
    };
    const getLoadingErrorComponent = () => {
        fixture.detectChanges();
        return fixture.debugElement.query(By.directive(LoadingErrorComponent));
    };
    const getComponentContainer = <T>(component) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        element = fixture.nativeElement;
        return fixture.componentInstance;
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                LoadingDirectiveTestModule
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

    });

    describe('LoadingSpinnerComponent', () => {
        describe('with data as `Boolean`', () => {
            beforeEach(() => container = getComponentContainer(ContainerBooleanComponent));

            it('should not show the `span` item while loading', () => {
                container.condition = false;
                expect(getSpanElement()).toBeNull();
                expect(getLoadingSpinnerComponent()).not.toBeNull();
            });

            it('should show the `span` item while not loading', () => {
                container.condition = true;
                expect(getSpanElement()).not.toBeNull();
                expect(getLoadingSpinnerComponent()).toBeNull();
            });

            it('should hide the `span` and show after loading', () => {
                container.condition = false;
                expect(getSpanElement()).toBeNull();
                expect(getLoadingSpinnerComponent()).not.toBeNull();
                container.condition = true;
                expect(getSpanElement()).not.toBeNull();
                expect(getLoadingSpinnerComponent()).toBeNull();
            });
        });

        describe('with data as `Observable<Boolean>`', () => {
            beforeEach(() => container = getComponentContainer(ContainerObservableComponent));

            it('should not show the `span` item while loading', fakeAsync(() => {
                container.condition.next(false);
                expect(getSpanElement()).toBeNull();
                expect(getLoadingSpinnerComponent()).not.toBeNull();
            }));

            it('should show the `span` item while not loading', fakeAsync(() => {
                container.condition.next(true);
                expect(getSpanElement()).not.toBeNull();
                expect(getLoadingSpinnerComponent()).toBeNull();
            }));

            it('should hide the `span` and show after loading', () => {
                container.condition.next(false);
                expect(getSpanElement()).toBeNull();
                expect(getLoadingSpinnerComponent()).not.toBeNull();
                container.condition.next(true);
                expect(getSpanElement()).not.toBeNull();
                expect(getLoadingSpinnerComponent()).toBeNull();
            });

            it('should add the class `my-5` to the `containerClass`', () => {

                (<ContainerObservableComponent>container).containerClass = 'my-5';
                container.condition.next(false);

                const containerOfSpinner = getLoadingSpinnerComponent().query(By.css('.my-5'));
                expect(containerOfSpinner).not.toBeNull();

            });
        });
    });

    describe('LoadingErrorComponent', () => {
        beforeEach(() => container = getComponentContainer(ContainerWithErrorComponent));

        it('should not show the `span` nor LoadingSpinner when error happens', fakeAsync(() => {
            (<ContainerWithErrorComponent>container).ngOnInit();
            expect(getSpanElement()).toBeNull();
            expect(getLoadingSpinnerComponent()).toBeNull();
        }));

        it('should show the component when error happens', fakeAsync(() => {
            (<ContainerWithErrorComponent>container).ngOnInit();
            expect(getLoadingErrorComponent()).not.toBeNull();
        }));

        it('should have default error message', fakeAsync(() => {
            (<ContainerWithErrorComponent>container).ngOnInit();
            const loadingErrorParagraph = getLoadingErrorComponent().query(By.css('.loading-error'));
            expect(loadingErrorParagraph.nativeElement.innerHTML).toContain('Error while loading');
        }));

        it('should have different error message', fakeAsync(() => {
            (<ContainerWithErrorComponent>container).errorKey = 'another.errorKey';
            (<ContainerWithErrorComponent>container).ngOnInit();
            const loadingErrorParagraph = getLoadingErrorComponent().query(By.css('.loading-error'));
            expect(loadingErrorParagraph.nativeElement.innerHTML).toContain('another.errorKey');
        }));
    });

});

