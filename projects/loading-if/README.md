
#@ng-mg/loading-if

Structural directive used similar as `*ngIf` but automatically will add an Spinner component to the DOM while loading. Once the loading is done, the DOM will be replaced with the actual  container where the directive is placed

### Examples usage
```
    <div *ngMgLoadingIf="data"> ... </div>
```
```
    <div *ngMgLoadingIf="data$ | async"> ... </div>
```
```
    <div *ngMgLoadingIf="data$ | async; let myData"> ... </div>
```

### Additional configurations

You can use some extra parameters inline the structural directive:

Parameter | Type | Value
------------ | ------------- | -------------
containerClass | string / string[] | CSS Classes to be attached to the Spinner Component container
error | boolean | It could stop loading and show the Error Component
errorMessage | string | The message shown on the Error Component


### Next steps

Let the developer inject their own Spinner Component and Error Component
