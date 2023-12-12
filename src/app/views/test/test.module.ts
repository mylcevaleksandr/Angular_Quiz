import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TestRoutingModule} from './test-routing.module';
import {TestComponent} from './test/test.component';
import {ResultComponent} from './result/result.component';
import {ChoiceComponent} from './choice/choice.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TestComponent,
    ResultComponent,
    ChoiceComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    NgOptimizedImage,
    FormsModule
  ]
})
export class TestModule {
}
