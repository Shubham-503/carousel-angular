import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, retry } from 'rxjs';
import { Buttonconfig } from './types.ts/button-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  images: any[] = [];
  loading = false;
  prevButtonConfig: Buttonconfig = {
    label: 'prev',
    styles: {
      'background-color': '#333',
      color: '#fff',
      border: 'none',
    },
  };
  nextButtonConfig: Buttonconfig = {
    label: 'next',
    styles: {
      'background-color': '#333',
      color: '#fff',
      border: 'none',
    },
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchImages(8);
  }

  fetchImages(imgLimit: number) {
    console.log('fetchImage called');

    this.loading = true;
    this.http
      .get<any[]>(
        `https://jsonplaceholder.typicode.com/photos?_limit=${imgLimit}`
      )
      .pipe(retry({ count: 2, delay: 2000, resetOnSuccess: true }))
      .subscribe({
        next: (data) => {
          console.log('data:>>>>', data);
          this.images = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching images:', error);
          this.loading = false;
        },
      });
  }

  onImgClick(image: any, index: number) {
    // Custom image click handler
    console.log('image: ', image, index);
  }

  goToNext() {
    console.log('next called');
  }
  goToBack() {
    console.log('back called');
  }
}
