import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Professor } from "../interface/professor.interface";
import { Turma, TurmaUpdate } from "../interface/turma.interface";
import { TurmaDocument } from "./schema/turma.schema";

export class TurmaRepository {
    constructor(
        @InjectModel("Turma") private readonly model: Model<TurmaDocument>,
    ) { }
    
    async create(turma: Turma): Promise<void> {
        await new this.model(turma).save();
    }

    async getAll(professor: Professor): Promise<Turma[]> {
        return await this.model.find({professor});
    }

    async getId(_id: string): Promise<Turma> {
        return await this.model.findOne({ _id });
    }

    async update(turma: TurmaUpdate): Promise<void> {
        await this.model.findByIdAndUpdate({ _id: turma._id }, { $set: turma });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
} 