import { Schema } from "mongoose";
import { Arquivo } from "src/arquivo/arquivo.interface";

export interface ArquivoDocument extends Arquivo { }

export const ArquivoSchema = new Schema<ArquivoDocument>({
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    nome: { type: String, required: true },
    tamanho: { type: String, required: true },
    caminho: { type: String, required: true },
    formato: { type: String, required: true },
}, {
    timestamps: true,
    collection: "Arquivo"
})