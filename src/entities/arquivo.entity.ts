import { Schema } from "mongoose";
import { Arquivo } from "../interfaces/arquivo.interface";
import { Usuario } from "../interfaces/usuario.interface";

export class ArquivoEntity {
    constructor(
        public nome: string,
        public tamanho: string,
        public caminho: string,
        public formato: string,
        public usuario: Usuario,
    ){ }
}

export const ArquivoFactory = (nome: string, tamanho: string, caminho: string, formato: string, usuario: Usuario): ArquivoEntity => {
    return new ArquivoEntity(nome, tamanho, caminho, formato, usuario);
}

export interface ArquivoDocument extends Arquivo { }

export const ArquivoSchema = new Schema<ArquivoDocument>({
    usuario: { type: Schema.Types.ObjectId, ref: "usuario", required: true },
    nome: { type: String, required: true },
    tamanho: { type: String, required: true },
    caminho: { type: String, required: true },
    formato: { type: String, required: true },
}, {
    timestamps: true,
    collection: "arquivo"
})