import { Professor } from "./professor.interface";
import { Turma } from "./turma.interface";

export interface Agendamento {
    professor: Professor;
    turma: Turma;
}