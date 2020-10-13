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
  ngAfterViewChecked(){
    const firstImage = document.getElementById('firstMan').firstElementChild.firstElementChild.getAttribute('src');
    const image = document.getElementById('header');
    if (image.style.backgroundImage === ''){
      image.style.backgroundImage = 'url(' + firstImage;
    }
  }


  onChageneSrc(src: string){
    if (src === this.src){
      return;
    }else{

    this.isOpen = false;
    this.src = src;
    setTimeout(() => {
      this.isOpen = true;
      document.getElementById('header').style.backgroundImage = 'url(' + src;
    }, 200);
  }
  }


}
