import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
  animations: [
    trigger('dataChange', [

      state('entering', style({
        opacity: 0.6
      })),
      state('done',   style({
        opacity: 1
      })),
      transition('entering <=> done', animate('400ms')),
    ])
  ]
})
export class AllComponent implements OnInit, AfterViewChecked {
  @Input() vkladamSrc: string;
  src: string;

  isOpen = true;
  imageState: 'entering' | 'done' = 'done';
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  onChageneSrc(src: string){
    if (src === this.src){
      return;
    }else{
      this.imageState = 'entering';
    this.src = src;
      setTimeout(function () {
        // console.l/og('Test');
        document.getElementById('header').style.backgroundImage = 'url(' + src;

      }, 400);
  }
  }


}
