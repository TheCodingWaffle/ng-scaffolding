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
