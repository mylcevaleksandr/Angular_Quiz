import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TestRoutingModule} from './test-routing.module';
import {TestComponent} from './test/test.component';
import {ResultComponent} from './result/result.component';
import {ChoiceComponent} from './choice/choice.component';


@NgModule({
  declarations: [
    TestComponent,
    ResultComponent,
    ChoiceComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    NgOptimizedImage
  ]
})
export class TestModule {
}
