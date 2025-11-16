import { Routes } from '@angular/router';
import { Bitacora } from './componentes/bitacora/bitacora';
import { Citas } from './componentes/citas/citas';
import { Encabezado } from './componentes/encabezado/encabezado.component';
import { Inicio } from './componentes/inicio/inicio';
import { Perfil } from './componentes/perfil/perfil';
import { Login } from './componentes/login/login';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [

    { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // redirección inicial
    { path: 'inicio', component: Inicio, canActivate: [authGuard] },
    { path: 'bitacora', component: Bitacora, canActivate: [authGuard] },
    { path: 'encabezado', component: Encabezado },
    { path: 'citas', component: Citas, canActivate: [authGuard] },
    { path: 'perfil', component: Perfil, canActivate: [authGuard] },
    { path: 'login', component: Login, canActivate: [publicGuard] },
    { path: '**', redirectTo: '/inicio' } // ruta por defecto si no existe

];
