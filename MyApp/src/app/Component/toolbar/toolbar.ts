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
import { FormControl, FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-toolbar',
  imports: [RouterOutlet ,MatSidenavModule,MatSnackBarModule,ReactiveFormsModule,CommonModule,MatIconModule,MatGridListModule,MatCardModule,MatToolbarModule,RouterLink,RouterLinkActive,MatButtonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {
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
          entry.target.classList.remove('show'); // Remove when out of view
        }
      });
    }, { threshold: 0.2 });

    this.animatedSections.forEach(section => observer.observe(section.nativeElement));
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
      image: '/Backend.png',  
      description: '`A backend developer builds and maintains the server-side of websites and applications,focusing on the parts users dont see A backend developer builds and maintains the server-side of websites and applications,focusing on the parts users dont see.`'
    },
    {
      title: 'service4',
      image: '/Backend.png',  
      description: '`A backend developer builds and maintains the server-side of websites and applications,focusing on the parts users dont see.`'
    }                                                                                                                                           

  ];
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleMenu() {
    this.sidenav.toggle();
  }
   currentIndex = 0;
  visibleCards:any[] = [];

  ngOnInit() {
    this.updateVisibleCards();
  }

 updateVisibleCards() {
  this.visibleCards = this.cards.slice(this.currentIndex, this.currentIndex + 3);

}

  nextSlide() {
    if (this.currentIndex + 3 < this.cards.length) {
      this.currentIndex++;
      this.updateVisibleCards();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleCards();
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

  nestedform:FormGroup;
  constructor(){
  this.nestedform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('',Validators.required),
      message: new FormControl('',Validators.required),
    });
}
private _snackBar = inject(MatSnackBar);
  onSubmit(): void {
    
    if(this.nestedform.valid){
      
    console.log(this.nestedform.value);
    this._snackBar.open('Message sent!!', 'Close')
    }
    else{
      console.log("invalid");
    }
  }
}
