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
        const turmas = await this.model.find({ professor }, ["tag", "nome", "frequencia"]);
        if (!turmas.length) null;
        return turmas;
    }

    async getId(_id: string, professor: Professor): Promise<Turma> {
        const turma = await this.model.findOne({ _id, professor }, ["tag", "nome", "frequencia"]);
        if (!turma) null;
        return turma;
    }

    async update(turma: Turma, professor: Professor): Promise<void> {
        await this.model.updateOne({ _id: turma._id, professor }, { $set: turma });
    }

    async delete(_id: string, professor: Professor): Promise<void> {
        await this.model.deleteOne({ _id, professor });
    }
}