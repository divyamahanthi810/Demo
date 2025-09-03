import { Routes } from '@angular/router';
import { Component3 } from './Component/component3/component3';
import { Component2 } from './Component/component2/component2';
export const routes: Routes = [
    {path:'home',component:Component3},
    {path:'AboutUs',component:Component2},
    {path:'Services',component:Component3},
    {path:'Team',component:Component2},
    {path:'Careers',component:Component3},
    {path:'WhyUs',component:Component2},
    {path:'Register',component:Component3},
    {path:'Contacts',component:Component2},
];
