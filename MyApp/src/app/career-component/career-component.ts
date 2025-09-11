// import { CommonModule } from '@angular/common';
// import { Component, HostListener, inject } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-career-component',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule],
//   templateUrl: './career-component.html',
//   styleUrl: './career-component.css'
// })
// export class CareerComponent {
//   constructor(private imageService: ,private _http:HttpClient) {}
//     careerImageSrc: string = ''; 
//     workWithUsImageDescription: String = ''; 
//     workWithUsImageSrc: string = ''; 
//   currentIndex = 0;
//   visibleCards: any[] = [];
//   imageCards: any[] = [];

//   searchJob: FormGroup = new FormGroup({
//     title: new FormControl('')
//   });

//   footerForm: FormGroup = new FormGroup({
//     name: new FormControl('', Validators.required),
//     email: new FormControl('', [
//       Validators.required,
//       Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
//     ]),
//     subject: new FormControl('', Validators.required),
//     message: new FormControl('', Validators.required)
//   });

//   private _snackBar = inject(MatSnackBar);

//   ngOnInit() {
//     this.fetchImages('Roles');
//     this.fetchCareerImage();
//     this.fetchWorkWithUsImage();
//     this.adjustVisibleCardsByScreen();
//   }
//  slidesToShow = 3;
// fetchImages(type: string) {
//   const URL = "http://localhost:8080/careers/admin/images/list";
//   this.imageService.getImage(URL).subscribe({
//     next: (response: CardData[]) => {
//       const filtered = response.filter(item => item.image_type === type);

//       this.imageCards = filtered.map(item => ({
//         src: `data:image/png;base64,${item.image}`,
//         alt: item.image_description,
//         header: item.image_header
//       }));

//       this.updateVisibleCards();
//     },
//     error: (error) => {
//       console.error("Error fetching images:", error);
//     }
//   });
// }

//   fetchCareerImage() {
//     const URL = "http://localhost:8080/careers/admin/images/list";
//     this.imageService.getImage(URL).subscribe({
//       next: (response: CardData[]) => {
//         const careerImage = response.find(item => item.image_type === 'Career');
//         if (careerImage) {
//           this.careerImageSrc = `data:image/png;base64,${careerImage.image}`;
//         }
//       },
//       error: (error) => {
//         console.error("Error fetching career image:", error);
//       }
//     });
//   }
//    @HostListener('window:resize') 
//   onResize() {
//     this.adjustVisibleCardsByScreen();
//   }

//   adjustVisibleCardsByScreen() { 
//     const width = window.innerWidth;
//     if (width < 600) {
//       this.slidesToShow = 1;
//     } else if (width < 1025) {
//       this.slidesToShow = 2;
//     } else {
//       this.slidesToShow = 3;
//     }
//     this.updateVisibleCards();
//   }



//   fetchWorkWithUsImage() {
//     const URL = "http://localhost:8080/careers/admin/images/list";
//     this.imageService.getImage(URL).subscribe({
//       next: (response: CardData[]) => {
//         console.log(response);
//         const workImage = response.find(item => item.image_type === 'Working with Us');
//         if (workImage) {
//           this.workWithUsImageSrc = `data:image/png;base64,${workImage.image}`;
//           this.workWithUsImageDescription = workImage.image_description;
//         }
//       },
//       error: (error) => {
//         console.error("Error fetching Work with us image:", error);
//       }
//     });
//   }


//   updateVisibleCards() {
//     this.visibleCards = this.imageCards.slice(this.currentIndex, this.currentIndex + this.slidesToShow);
//   }

//   nextSlide() {
//     if (this.currentIndex + this.slidesToShow < this.imageCards.length) {
//       this.currentIndex++;
//       this.updateVisibleCards();
//     }
//   }

//   prevSlide() {
//     if (this.currentIndex > 0) {
//       this.currentIndex--;
//       this.updateVisibleCards();
//     }
//   }

//   createContact(url: string, value: any){
//     return this._http.post(url,value,{responseType:"text"});

//   }
//   onSubmit(): void {
//     if (this.footerForm.valid) {
//       const api_Url="http://localhost:8080/careers/contacts/add";
//       this.createContact(api_Url,this.footerForm.value).subscribe({
//         next:(message)=>{
//           console.log("msg submitted");
//         }
//         ,
//         error:(error)=>{
//           console.log(error)
//         }
//       })
//       this._snackBar.open('Message sent!!', 'Close');
//       this.footerForm.reset();
//     } else {
//       console.log("Form is invalid");
//     }
//   }


// }