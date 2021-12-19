import { Aula } from "./aula.interface";
import { Turma } from "./turma.interface";

export interface TurmaAula {
    turma: Turma;
    aula: Aula;
}