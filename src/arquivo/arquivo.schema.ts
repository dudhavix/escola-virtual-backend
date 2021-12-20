import { Document, Schema } from "mongoose";
import { Arquivo } from "src/arquivo/arquivo.interface";

export interface ArquivoDocument extends Arquivo, Document { }

export const ArquivoSchema = new Schema<ArquivoDocument>({
    nome: { type: String, required: true },
    path: { type: String, required: true }
}, {
    timestamps: true,
    collection: "Arquivo"
})