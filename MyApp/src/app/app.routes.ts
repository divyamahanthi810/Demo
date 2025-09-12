import { Routes } from '@angular/router';
import { Toolbar } from './Component/toolbar/toolbar';
import { CareerComponent } from './career-component/career-component';
export const routes: Routes = [
    {path:'',component:Toolbar},
    {path:'career',component:CareerComponent}
];
