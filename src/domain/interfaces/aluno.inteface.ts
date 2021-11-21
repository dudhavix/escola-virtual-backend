import { Document } from "mongoose";
import { Nivel } from "../utils/nivel-enum";

export interface Aluno extends Document {
    nome: string;
    email: string;
    telefone: string;
    data_nascimento: string;
    endereco: string;
    nivel_atual: Nivel;
    nivel_meta: Nivel;
    observacao: string;
    status: boolean;
}