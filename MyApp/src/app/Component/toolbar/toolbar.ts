import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { HostListener, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import emailjs,{ type EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-toolbar',
  imports: [RouterOutlet ,MatSidenavModule,MatSnackBarModule,ReactiveFormsModule,CommonModule,MatIconModule,MatGridListModule,MatCardModule,MatToolbarModule,RouterLink,RouterLinkActive,MatButtonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  scrollTo(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
 @ViewChildren('animatedSection', { read: ElementRef }) animatedSections!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }else {
          entry.target.classList.remove('show');
        }
      });
    }, { threshold: 0.2 });

    this.animatedSections.forEach(section => observer.observe(section.nativeElement));
  }
   @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleMenu() {
    this.sidenav.toggle();
  }
  cards = [
    {
      title: 'Frontend Developer',
      image: '/frontend.jpeg',
      description:'`A front-end developer builds the parts of websites and applications that users see and interact with directly,using core languages like HTML, CSS, and JavaScript to create the visual interface.`',
    },
    {
      title: 'Full Stack Developer',
      image: '/Full stack.png',
      description: '`A front-end developer builds the parts of websites and applications that users see and interact with directly,using core languages like HTML, CSS, and JavaScript to create the visual interface.`',
    },
    {
      title: 'Backend Developer',      
      image: '/back.png',  
      description: '`A backend developer builds and maintains the server-side of websites and applications,focusing on the parts users dont see'
    },
    {
      title: 'service4',
      image: '/back.png',  
      description: '`A backend developer builds and maintains the server-side of websites and applications,focusing on the parts users dont see.`'
    }                                                                                                                                           

  ];
  currentIndex = 0;
  cardsPerView = this.getCardsPerView();

  @HostListener('window:resize')
  onResize() {
    this.cardsPerView = this.getCardsPerView();
    this.updateCarousel();
  }

  getCardsPerView(): number {
    if (window.innerWidth <= 480) return 1;   
    if (window.innerWidth <= 1024) return 2;  
    return 3;                                 
  }

  updateCarousel() {
    const track = document.querySelector<HTMLElement>('.carousel-track');
    if (track) {
      const cardWidth = track.querySelector<HTMLElement>('.card')?.offsetWidth || 0;
      track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.cards.length - this.cardsPerView) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }
  teamMembers = [
    {
      name: 'DVVS Raju',
      role: 'Managing Director',
      bio: 'Managing Director of AASLIN.',
      image: 'employee1.png',
      linkedin:'https://linked.com',
      github: 'https://github.com',
    },
    {
      name: 'Murali Krishna Paidi',
      role: 'IT Manager',
      bio: 'Leads developer, QA and support team.',
      image: 'employee1.png',
      linkedin: 'https://linked.com',
      github: 'https://github.com',
    },
  ];

private _snackBar = inject(MatSnackBar);
  contactform!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.contactform = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.contactform.valid) {
      const formData = this.contactform.value;

      emailjs.send(
        'service_q1y3nqd',    
        'template_d2laofw',  
        {
          from_name: formData.firstName,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        '3EY8SajBWMvGEffft'    
      ).then((result: EmailJSResponseStatus) =>
    {
      if(this.contactform.valid){
      
      console.log(this.contactform.value);
      this._snackBar.open('Message sent!!', 'Close');
      this.contactform.reset()
    }
    else{
      console.log("invalid");
    }
  });
}
  }
}
