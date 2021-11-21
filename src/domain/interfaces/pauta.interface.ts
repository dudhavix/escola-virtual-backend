import { Document } from "mongoose";

export interface Pauta extends Document {
    presente: boolean;
    aluno: string;
}