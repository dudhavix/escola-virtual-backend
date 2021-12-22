import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Aluno } from "../aluno/aluno.interface";
import { StatusEnum } from "../enum/status.enum";
import { Tarefa } from "../tarefa/tarefa.interface";
import { TarefaAluno, TarefaAlunoStatus } from "./tarefa-aluno.interface";
import { TarefaAlunoDocument } from "./tarefa-aluno.schema";

export class TarefaAlunoRepository {
    constructor(
        @InjectModel("TarefaAluno") private readonly model: Model<TarefaAlunoDocument>,
    ) { }
    
    async create(tarefaAluno: TarefaAluno): Promise<void> {
        await new this.model(tarefaAluno).save();
    }

    async getAllTarefa(tarefa: Tarefa): Promise<TarefaAluno[]> {
        return this.model.find({tarefa}).populate("aluno");
    }

    async getAllAluno(aluno: Aluno): Promise<TarefaAluno[]> {
        return this.model.find({aluno}).populate("tarefa");
    }

    async getAll(): Promise<TarefaAluno[]> {
        return this.model.find().populate("aluno").populate("tarefa");
    }

    async getId(_id: string): Promise<TarefaAluno> {
        return this.model.findOne({ _id }).populate("aluno").populate("tarefa");
    }

    async update(tarefaAluno: TarefaAlunoStatus, _id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: tarefaAluno });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
}