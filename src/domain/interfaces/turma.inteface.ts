import { Document } from "mongoose";
import { DefinicaoTurma } from "../utils/definicao-turma-enum";
import { Aluno } from "./aluno.inteface";

export interface Turma extends Document {
    definicao: DefinicaoTurma;
    nome: string;
    alunos: Array<Aluno>;
    frequencia: string;
    observacao: string;
}