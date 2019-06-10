/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingErrorComponent} from './loading-error.component';
import {By} from '@angular/platform-browser';

describe('LoadingErrorComponent', () => {
    let component: LoadingErrorComponent;
    let fixture: ComponentFixture<LoadingErrorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                imports: [],
                declarations: [LoadingErrorComponent]
            })
            .compileComponents();
    }));

    const getErrorMessage = () => {
        fixture.detectChanges();
        return fixture.debugElement.query(By.css('p')).nativeElement.innerHTML;
    };
    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingErrorComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should create', () => {
        expect(getErrorMessage()).toContain('Error while loading');
    });

    it('should create', () => {
        component.message = 'another.text';
        expect(getErrorMessage()).toContain('another.text');
    });
});
