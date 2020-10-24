import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
  animations: [
    trigger('openClose', [

      state('true', style({
        opacity: 1
      })),
      state('false',   style({
        opacity: 0
      })),
      transition('false <=> true', animate('200ms')),
    ])
  ]
})
export class AllComponent implements OnInit {
  @Input() vkladamSrc: string;
  src: string;

  isOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  onChageneSrc(src: string){
    if (src === this.src){
      return;
    }else{
    this.src = src;
    document.getElementById('header').style.backgroundImage = 'url(' + src;
  }
  }


}
