/// <reference types="Jasmine" />
// above prevents type error on storybook as 'beforeEach' type cannot be inferred.
import {
  fireEvent,
  render,
  RenderComponentOptions,
  RenderResult,
  screen,
} from '@testing-library/angular';
import {
  SelectorMatcherOptions,
  MatcherOptions,
  ByRoleOptions,
} from '@testing-library/dom';
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';

export enum Ng {
  OnChanges = 'ngOnChanges',
  OnInit = 'ngOnInit',
  DoCheck = 'ngDoCheck',
  AfterContentInit = 'ngAfterContentInit',
  AfterContentChecked = 'ngAfterContentChecked',
  AfterViewInit = 'ngAfterViewInit',
  AfterViewChecked = 'ngAfterViewChecked',
  OnDestroy = 'ngOnDestroy',
}

export class TestUtil<COMPONENT> {
  screen: typeof screen;
  render: RenderResult<COMPONENT>;

  constructor(
    component: Type<COMPONENT>,
    options?: RenderComponentOptions<COMPONENT>
  ) {
    beforeEach(async () => {
      this.render = await render(component, options);
      this.screen = screen;
    });
  }

  get fixture() {
    return this.render.fixture;
  }

  get component() {
    return this.fixture.componentRef.instance;
  }

  child<CHILD>(type: Type<CHILD>) {
    return this.fixture.debugElement
      .query(By.directive(type))
      .injector.get(type);
  }

  getAllChildren<CHILD>(type: Type<CHILD>) {
    return this.fixture.debugElement.queryAll(By.directive(type));
  }

  detectChanges() {
    return this.fixture.detectChanges();
  }

  rerender(props: Partial<COMPONENT>) {
    this.render.rerender(props);
    this.detectChanges();
  }

  rerenderNg(props: Partial<COMPONENT>, event?: Ng) {
    this.render.rerender(props);
    if (event && this.component[event]) {
      this.component[event]();
    }
    this.detectChanges();
  }

  fireEvent(element: Element, event: string | Event): void {
    const _event =
      (String.isString(event) && new Event(event as string)) ||
      (event as Event);
    fireEvent(element, _event);
  }

  getByCss<ELEMENT_TYPE extends Element>(selector: string): ELEMENT_TYPE {
    return this.fixture.debugElement.query(By.css(selector))?.nativeElement;
  }

  getAllByCss<ELEMENT_TYPE extends Element>(selector: string): ELEMENT_TYPE[] {
    const debugElements = this.fixture.debugElement.queryAll(By.css(selector));
    return debugElements.map(({ nativeElement }) => nativeElement);
  }

  getByRole<HTML_ELEMENT_TYPE extends HTMLElement>(
    value: string,
    options?: ByRoleOptions
  ): HTML_ELEMENT_TYPE {
    return this.screen.getByRole(value, options) as HTML_ELEMENT_TYPE;
  }

  getAllByRole<HTML_ELEMENT_TYPE extends HTMLElement>(
    value: string,
    options?: ByRoleOptions
  ): HTML_ELEMENT_TYPE[] {
    return this.screen.getAllByRole(value, options) as HTML_ELEMENT_TYPE[];
  }

  getByPlaceholder<HTML_ELEMENT_TYPE extends HTMLElement>(
    value: string,
    options?: MatcherOptions
  ): HTML_ELEMENT_TYPE {
    return this.screen.getByPlaceholderText(
      value,
      options
    ) as HTML_ELEMENT_TYPE;
  }

  getByText<HTML_ELEMENT_TYPE extends HTMLElement>(
    value: string,
    options?: SelectorMatcherOptions
  ): HTML_ELEMENT_TYPE {
    return this.screen.getByText(value, options) as HTML_ELEMENT_TYPE;
  }
}
