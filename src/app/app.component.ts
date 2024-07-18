import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  images: any[] = [];
  loading = false;

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
      .subscribe(
        (data) => {
          console.log('data:>>>>', data);

          this.images = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching images:', error);
          this.loading = false;
        }
      );
  }

  onImgClick(image: any, index: number) {
    // Custom image click handler
  }

  customPrevButton(onClick: () => void) {
    return `<button class="btn prev" style="background: red;" (click)="onClick()">Prev</button>`;
  }

  customNextButton(onClick: () => void) {
    return `<button class="btn next" style="background: blue;" (click)="onClick()">Next</button>`;
  }
}
