import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo/photo.service';
import { Photo } from '../models/photo.interface';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.sass']
})
export class PhotoComponent implements OnInit {

  listPhotos: Photo[] = null;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getPhotos().subscribe(
      observer => this.listPhotos = observer
    );
  }

}
