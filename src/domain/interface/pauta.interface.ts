import { Aluno } from "./aluno.interface";

export interface Pauta {
    aluno: Aluno;
    presente: boolean;
    atraso: string;
    observacao: string;
}