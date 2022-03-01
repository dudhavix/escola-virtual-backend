import { Schema } from "mongoose";
import { FrequenciaTurmaEnum, TagTurmaEnum } from "../helpers/index.enum";
import { Turma } from "../interfaces/turma.interface";
import { Usuario } from "../interfaces/usuario.interface";
import { TurmaCreateModel } from "../models/turma.model";

export class TurmaEntity {
    constructor(
        public usuario: Usuario,
        public tag: TagTurmaEnum,
        public nome: string,
        public frequencia: FrequenciaTurmaEnum,
        public observacao: string,
    ) { }
}

export const TurmaCreateFactory = (viewModel: TurmaCreateModel): TurmaEntity => {
    let { frequencia, nome, observacao, tag, usuario } = viewModel;
    
    tag = TagTurmaEnum[tag];
    frequencia = FrequenciaTurmaEnum[frequencia];
    
    return new TurmaEntity(usuario, tag, nome, frequencia, observacao);
}

export interface TurmaDocument extends Turma { }

export const TurmaSchema = new Schema<TurmaDocument>({
    usuario: { type: Schema.Types.ObjectId, ref: "usuario", required: true },
    tag: { type: String, enum: Object.values(TagTurmaEnum), required: true },
    nome: { type: String, required: true },
    frequencia: { type: String, enum: Object.values(FrequenciaTurmaEnum), required: true },
    observacao: { type: String, required: false }
}, {
    timestamps: true,
    collection: "turma"
})