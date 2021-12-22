import { Document, Schema } from "mongoose";
import { Arquivo } from "src/arquivo/arquivo.interface";

export interface ArquivoDocument extends Arquivo, Document { }

export const ArquivoSchema = new Schema<ArquivoDocument>({
    nome: { type: String, required: true },
    tamanho: { type: String, required: true },
    caminho: { type: String, required: true },
    formato: { type: String, required: true },
}, {
    timestamps: true,
    collection: "Arquivo"
})