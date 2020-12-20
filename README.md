ng-scaffolding
============================
This is a scalable boiler plate Angular project to quickly *scaffold* a project and get coding. 


Folder Structure Conventions
============================

### Top-level directory 

    src/app/.
    ├── assets                   		# Contains images and other asset files to be copied as-is when you build your application.
        ├── i18n                   		# Internationalization and localization
        ├── icons
        ├── images       
    ├── core                     		# Shared singleton services only
    ├── feaures                  		# Code relevant for a specific feature
	    ├── featureA
		    ├── components
		    ├── services
		    featureA-routing.module.ts	# Lazy loaded ngModules as needed
		    featureA.component.html
		    featureA.component.scss
		    featureA.component.spec.html
		    featureA.component.ts
		    featureA.module.ts
    ├── shared                   		# Everything shared throughout the app 
	    ├── components
	    ├── constants
	    ├── enums
	    ├── guards
	    ├── interceptor
	    ├── models
	    shared.module.ts
    ├── styles 

TestUtil.ts
============================

This utility class is used to make writing tests easier, quicker, and more reusable. This is a glorified wrapper for the [@testing-library/angular](https://www.npmjs.com/package/@testing-library/angular). This library focuses on:

> The more your tests resemble the way your software is used, the more confidence they can give you.

**TestUtil** wraps the core functions in a way to reduce multiple redundant function chaining and also doing null checking in once place instead of every time you need to implement a function. It finally tries to reduce magic strings by having some common **Ng lifecycle** strings pulled out into an enum.

#### Examples
*Options and Initialization :*
```javascript
describe('InputComponent', () => {
const  options = {
declarations: [InputComponent],
imports:[
   MatFormFieldModule,
   MatInputModule,
   BrowserAnimationsModule
     ]
};

const  util = new  TestUtil(InputComponent, options);
```

*Render:*
```javascript
it('should have label when set', () => {
	const  label = 'Some Label';
	util.rerender({ label });
	const  element = util.getByText<HTMLInputElement>(label);
	expect(element.textContent).toEqual(label);
});
```

*Fire Event & Get Element by CSS Class :*

```javascript
it('should have placeholder when set', () => {
	const  placeholder = 'Some Placeholder';
	util.rerender({ placeholder }); 
	
	const  input = util.getByCss('.input');
	util.fireEvent(input, 'focus'); 
	
	const  focusedInput = util.getByPlaceholder<HTMLInputElement>(placeholder);
	expect(focusedInput.placeholder).toEqual(placeholder);
});
```


*Error Checking:*
```javascript
it('should show errors when validator condition not met', async () => {
	util.rerenderNg({ validators, value:  '3' }, Ng.OnInit);
	expect(util.component.errors).toEqual(errorMessage);
	expect(util.component.formControl.valid).toBeFalse();
});
```

StateService.ts
============================

Boiler plate state mangament super class for services that will be implementing state into them. (Utilizes RxJs)

#### Example

```javascript
// Extends StateService and Passing State Interface in 
export class UserService extends StateService<UsesrState> {
  // Set all observables	
  permissions$ = this.state$.pipe(
    map((state) => state.permissions),
    distinctUntilChanged()
  );

  departments$ = this.state$.pipe(
    map((state) => state.departments),
    distinctUntilChanged()
  );

  currentStatus$ = this.state$.pipe(
    map((state) => state.currentStatus),
    distinctUntilChanged()
  );


  //Set the view model
  constructor() {
    super();
    this.vm$ = combineLatest([
      this.permissions$,
      this.departments$,
      this.currentStatus$,

    ]).pipe(
      map(([permissions,departments,currentStatus]) => {
          return {permissions,departments,currentStatus};
      })
    );
  }

  // Update everything in service to keep state immutable
  updateStatus = (newStatus: UserStatus) => {
    this.updateState({
      ...this.serviceState,
      currentStatus
    });
  }

}

// Interface for your services state
export interface UsesrState {
  permissions: PermissionModel[];
  departments: DepartmentModel[];
  currentStatus: UserStatus;
}
```
