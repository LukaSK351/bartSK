import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../data/data.service';
import {Gallery} from '../../model/gallery';
import {MatDialogComponent} from '../mat-dialog/mat-dialog.component';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {GalleryService} from '../../services/gallery.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Output() imageSrc = new EventEmitter<string>();
  galleries: Gallery[];
  galleries2;

    constructor(public dataService: DataService, private dialog: MatDialog, private galleryService: GalleryService) { }


  ngOnInit(): void {
    this.galleries = this.dataService.galleries();
  }

  onMouseMove(e){
      if (document.elementFromPoint(e.pageX, e.pageY).classList.contains('toto')){
        const url = document.elementFromPoint(e.pageX, e.pageY).getAttribute('src');
        this.imageSrc.emit(url);
      }
  }

  openAddFileDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '23em';
    const dialogRef = this.dialog.open(MatDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value === undefined){
        return;
      }else {
        this.addCategory(value);
      }
    });
  }

  addCategory(name){
      if (name === ''){
        return;
      }
      const newCategory = {
      label: name,
        icon: 'assets/gallery/no-image.jpg',
       };
      this.dataService.addCategory(newCategory);
  }
}

