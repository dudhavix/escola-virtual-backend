import { Aluno } from "../aluno/aluno.interface";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export interface Pauta {
    professor?: Professor;
    turma?: Turma;
    aluno?: Aluno;
    frequencia?: [{ dataHora: string, presente: boolean }];
    atraso?: string;
    observacao?: string;
    _id?: string;
}