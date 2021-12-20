import { Aula } from "../aula/aula.interface";
import { Turma } from "../turma/turma.interface";

export interface TurmaAula {
    turma: Turma;
    aula: Aula;
}