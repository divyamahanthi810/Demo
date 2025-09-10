import { Component, inject } from '@angular/core';
import { HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatNavList} from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import emailjs,{ type EmailJSResponseStatus } from 'emailjs-com';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-component3',
  imports: [ReactiveFormsModule,RouterOutlet, FormsModule,CommonModule ,MatSidenavModule,MatNavList,MatToolbarModule,MatIcon],
  templateUrl: './component3.html',
  styleUrl: './component3.css'
})
export class Component3 {
  nestedform!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.nestedform = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  private _snackBar = inject(MatSnackBar);
  onSubmit(): void {
    if (this.nestedform.valid) {
      const formData = this.nestedform.value;

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
      if(this.nestedform.valid){
      
      console.log(this.nestedform.value);
      this._snackBar.open('Message sent!!', 'Close')
    }
    else{
      console.log("invalid");
    }
  });
      //  {
      //   alert('Message sent successfully!');
      //   console.log(result.text);
      //   this.nestedform.reset();
      // }, (error) => {
      //   alert('Failed to send message. Please try again.');
      //   console.error(error.text);
      // });
    } else {
      this.nestedform.markAllAsTouched();
    }
  }
  }
  // isScrolled = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   this.isScrolled = window.scrollY > 50; // Change after 50px
  // }

  // scrollTo(section: string) {
  //   document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  // }
  // activeSection = 'home';
  // isMobile = false;

  // cards = [
  //   { title: 'Web Development', content: 'Modern and responsive web applications.' },
  //   { title: 'Mobile Apps', content: 'Build scalable mobile solutions.' },
  //   { title: 'Cloud Services', content: 'Secure and scalable cloud deployments.' }
  // ];

  // constructor(private breakpointObserver: BreakpointObserver) {
  //   this.breakpointObserver.observe([Breakpoints.Handset])
  //     .subscribe(result => {
  //       this.isMobile = result.matches;
  //     });
  // }

  // setActive(section: string) {
  //   this.activeSection = section;
  // }

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
//   }
// }
