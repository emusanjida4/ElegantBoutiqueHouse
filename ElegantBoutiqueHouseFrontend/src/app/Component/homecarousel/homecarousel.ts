import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarCategoryComponent } from '../navbar/navbar';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-home',
  templateUrl: './homecarousel.html',
  styleUrls: ['./homecarousel.css'],
  imports: [CommonModule,NavbarCategoryComponent,FooterComponent]
})
export class HomeComponent {
  carouselImages = [
    'assets/HomeCarousel/im2.jpg',
    'assets/HomeCarousel/im3.jpg'
    
  ];
  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }
}
