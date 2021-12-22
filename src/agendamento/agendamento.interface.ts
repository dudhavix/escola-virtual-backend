import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export interface Agendamento {
    professor: Professor;
    turma: Turma;
    dataHora: string;
}