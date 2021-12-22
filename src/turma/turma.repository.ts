import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
        return this.model.find({professor});
    }

    async getId(_id: string): Promise<Turma> {
        return this.model.findOne({ _id });
    }

    async update(turma: Turma, _id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: turma });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
} 