import { Document, Schema } from "mongoose";
import { NivelEnum } from "src/domain/enum/nivel.enum";
import { Gramatica } from "src/domain/interface/gramatica.interface";

export interface GramaticaDocument extends Gramatica, Document { }

export const GramaticaSchema = new Schema<GramaticaDocument>({
    professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
    sentenca1: { type: String, required: true },
    sentenca2: { type: String, required: true },
    nivel: { type: String, enum: Object.values(NivelEnum), required: true }
}, {
    timestamps: true,
    collection: "Gramatica"
})