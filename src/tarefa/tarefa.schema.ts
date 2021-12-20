import { Document, Schema } from "mongoose";
import { Tarefa } from "src/tarefa/tarefa.interface";

export interface TarefaDocument extends Tarefa, Document { }

export const TarefaSchema = new Schema<TarefaDocument>({
    aula: { type: Schema.Types.ObjectId, ref: "Aula", required: true },
    arquivos: [{ type: Schema.Types.ObjectId, ref: "Arquivo", required: true }],
    observacao: { type: String, required: false },
    dataEntrega: { type: String, required: true },
}, {
    timestamps: true,
    collection: "Tarefa"
})