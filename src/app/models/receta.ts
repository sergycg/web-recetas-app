import { Generic } from './generic';
import { RecetaIngredientes } from './receta-ingrediente';
import { Paso } from './paso';
export class Receta implements Generic {
    id: number;
    nombre: string;
    descripcion: string;
    observaciones: string;
    createAt: string;
    ingredientes: RecetaIngredientes[] = [];
    pasos: Paso[] = [];
    fotoPortada: string;
}
