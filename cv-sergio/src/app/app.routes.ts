import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Formacion } from './formacion/formacion';
import { Experiencia } from './experiencia/experiencia';
import { Habilidades } from './habilidades/habilidades';
import { Formulario } from './formulario/formulario';


export const routes: Routes = [
    {path: '', component: Inicio},
    {path: 'formacion', component: Formacion},
    {path: 'experiencia', component: Experiencia},
    {path: 'habilidades', component: Habilidades},
    {path: 'formulario', component: Formulario}    
];
