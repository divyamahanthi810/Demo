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
@Component({
  selector: 'app-toolbar',
  imports: [MatSnackBarModule,ReactiveFormsModule,CommonModule,MatIconModule,MatGridListModule,MatCardModule,MatToolbarModule,RouterLink,RouterLinkActive,MatButtonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {
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

  backend=`A backend developer builds and maintains the server-side of websites and applications,
   focusing on the parts users don't see.`;

  frontend=`A front-end developer builds the parts of websites and applications that users see and interact with directly,
   using core languages like HTML, CSS, and JavaScript to create the visual interface.`;

  currentPosition = 0;
  cardWidth = 320; 

  nextSlide() {
    if (this.currentPosition > -(this.cardWidth * 2)) { 
      this.currentPosition -= this.cardWidth;
    }
  }

  prevSlide() {
    if (this.currentPosition < 0) {
      this.currentPosition += this.cardWidth;
    }
}

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
