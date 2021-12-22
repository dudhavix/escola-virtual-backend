import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Aula } from "../aula/aula.interface";
import { Turma } from "../turma/turma.interface";
import { TurmaAula } from "./turma-aula.interface";
import { TurmaAulaDocument } from "./turma-aula.schema";

export class TurmaAulaRepository {
    constructor(
        @InjectModel("TurmaAula") private readonly model: Model<TurmaAulaDocument>,
    ) { }
    
    async create(turmaAula: TurmaAula): Promise<void> {
        await new this.model(turmaAula).save();
    }

    async getAllTurma(turma: Turma): Promise<TurmaAula[]> {
        return this.model.find({turma}).populate("aula");
    }

    async getAllAula(aula: Aula): Promise<TurmaAula[]> {
        return this.model.find({aula}).populate("turma");
    }

    async getAll(): Promise<TurmaAula[]> {
        return this.model.find().populate("aula").populate("turma");
    }

    async getId(_id: string): Promise<TurmaAula> {
        return this.model.findOne({ _id }).populate("aula").populate("turma");
    }

    async update(turmaAula: TurmaAula, _id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: turmaAula });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
} 