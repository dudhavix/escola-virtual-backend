import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StatusEnum } from "../enum/status.enum";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { Aluno } from "./aluno.interface";
import { AlunoDocument } from "./aluno.schema";

export class AlunoRepository {
    constructor(
        @InjectModel("Aluno") private readonly model: Model<AlunoDocument>,
    ) { }

    async create(aluno: Aluno): Promise<void> {
        await new this.model(aluno).save();
    }

    async getAll(professor: Professor): Promise<Aluno[]> {
        return this.model.find({professor});
    }

    async getAllTurma(turma: Turma): Promise<Aluno[]> {
        return this.model.find({turma});
    }

    async getId(_id: string): Promise<Aluno> {
        return this.model.findOne({ _id });
    }

    async ativar(_id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: {status: StatusEnum.ativo} });
    }

    async desativar(_id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: {status: StatusEnum.inativo} });
    }


    async update(aluno: Aluno, _id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: aluno });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
}