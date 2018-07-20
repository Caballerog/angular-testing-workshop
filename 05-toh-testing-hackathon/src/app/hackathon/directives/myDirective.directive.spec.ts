import { NonNumericDirective } from './myDirective.directive';
// impor testing utilities (TestBed, ComponentFixture, async)
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
// import Component
import { Component } from '@angular/core';
// import By
import { By } from '@angular/platform-browser';

// Create test host component (input and textarea elements)
@Component({
  template: `<input myDirective type="text"/>
             <textarea myDirective></textarea>`,
})
class TestHostComponent {}

describe('myDirective: Solution', () => {
  // configure TestBed in a beforeEach
  // retrieve fixture and the component instance
});
