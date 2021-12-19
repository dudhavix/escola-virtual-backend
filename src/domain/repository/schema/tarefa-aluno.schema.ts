import { Document, Schema } from "mongoose";
import { TarefaAluno } from "src/domain/interface/tarefa-aluno.interface";

export interface TarefaAlunoDocument extends TarefaAluno, Document { }

export const TarefaAlunoSchema = new Schema<TarefaAlunoDocument>({
    tarefa: { type: Schema.Types.ObjectId, ref: "Tarefa", required: true },
    aluno: { type: Schema.Types.ObjectId, ref: "Aluno", required: true },
}, {
    timestamps: true,
    collection: "TarefaAluno"
})