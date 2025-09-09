import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatNavList} from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-component3',
  imports: [RouterOutlet, FormsModule,CommonModule ,MatSidenavModule,MatNavList,MatToolbarModule,MatIcon],
  templateUrl: './component3.html',
  styleUrl: './component3.css'
})
export class Component3 {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Change after 50px
  }

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
  activeSection = 'home';
  isMobile = false;

  cards = [
    { title: 'Web Development', content: 'Modern and responsive web applications.' },
    { title: 'Mobile Apps', content: 'Build scalable mobile solutions.' },
    { title: 'Cloud Services', content: 'Secure and scalable cloud deployments.' }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  setActive(section: string) {
    this.activeSection = section;
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const sections = ['home', 'about', 'cards', 'contact'];
  //   for (const sec of sections) {
  //     const element = document.getElementById(sec);
  //     if (element) {
  //       const rect = element.getBoundingClientRect();
  //       if (rect.top <= 100 && rect.bottom >= 100) {
  //         this.activeSection = sec;
  //         break;
  //       }
  //     }

}
//   }
// }
