import { Aluno } from "../aluno/aluno.interface";

export interface Pauta {
    aluno: Aluno;
    presente: boolean;
    atraso: string;
    observacao: string;
}