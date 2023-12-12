import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {parse5} from "@angular/cdk/schematics";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
  constructor(private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      if (params['id']){

      }
    })
  }
}
