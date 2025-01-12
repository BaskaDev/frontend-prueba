import { Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', 
        component: RegisterComponent
    },
    {
        path: 'dashboard/:data', // Elimina el prefijo '/'
        component: DashboardComponent
    },{
        path: '**', redirectTo: '' 
    }
];
