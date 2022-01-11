import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { Turma } from "./turma.interface";
import { TurmaDocument } from "./turma.schema";

export class TurmaRepository {
    constructor(
        @InjectModel("Turma") private readonly model: Model<TurmaDocument>,
    ) { }
    
    async create(turma: Turma): Promise<void> {
        await new this.model(turma).save();
    }

    async getAll(professor: Professor): Promise<Turma[]> {
        return this.model.find({professor}, ["tag", "nome", "frequencia"]);
    }

    async getId(_id: string, professor: Professor): Promise<Turma> {
        return this.model.findOne({ _id, professor }, ["tag", "nome", "frequencia"]);
    }

    async update(turma: Turma, professor: Professor): Promise<void> {
        await this.model.findByIdAndUpdate({ _id: turma._id, professor }, { $set: turma });
    }

    async delete(_id: string, professor: Professor): Promise<void> {
        const turma = await this.model.findOne({_id, professor })
        if (!turma) throw new BadRequestException("Professor e turma não são compátiveis");
        await this.model.deleteOne({ _id, professor });
    }
} 