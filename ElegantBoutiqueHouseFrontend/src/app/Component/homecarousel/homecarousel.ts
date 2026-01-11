import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homecarousel.html',
  styleUrls: ['./homecarousel.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  carouselImages: string[] = [
    'assets/HomeCarousel/im2.jpg',
    'assets/HomeCarousel/im3.jpg'
  ];

  currentIndex: number = 0;
  intervalId: any = null;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.carouselImages.length;
    }, 1000); // 1 second per slide
  }
}
