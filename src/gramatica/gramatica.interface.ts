import { NivelEnum } from "../enum/nivel.enum";
import { Professor } from "../professor/professor.interface";

export interface Gramatica {
    professor: Professor;
    sentenca1: string;
    sentenca2: string;
    nivel: NivelEnum;
}