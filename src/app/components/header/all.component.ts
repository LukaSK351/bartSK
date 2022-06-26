import {AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataService} from '../../data/data.service';

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
      transition('entering <=> done', animate('150ms')),
    ])
  ]
})
export class AllComponent implements OnInit, AfterContentInit, AfterViewChecked {
  @Input() vkladamSrc: string;
  src: string;

  imageState: 'entering' | 'done' = 'done';
  constructor(private cdRef: ChangeDetectorRef, private dataService: DataService) { }

  ngOnInit(): void {

  }

  ngAfterContentInit() {
    this.dataService.currentImage.subscribe(img => {
      if (img !== 'empty') {
      this.onChageneSrc(img);
      }
    });

  }

  onChageneSrc(src: string){
    if (src === this.src){
      return;
    }else{
      if (this.imageState !== 'entering'){
        this.imageState = 'entering';
      }

      this.src = src;
      setTimeout( () =>  {
        document.getElementById('header').style.backgroundImage = 'url(' + src;
      }, 150);
  }
  }


  ngAfterViewChecked(): void {

  }


}
