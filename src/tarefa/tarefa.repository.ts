import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Professor } from "../professor/professor.interface";
import { Tarefa } from "./tarefa.interface";
import { TarefaDocument } from "./tarefa.schema";

export class TarefaRepository {
    constructor(
        @InjectModel("Tarefa") private readonly model: Model<TarefaDocument>,
    ) { }
    
    async create(tarefa: Tarefa): Promise<void> {
        await new this.model(tarefa).save();
    }

    async getAll(professor: Professor): Promise<Tarefa[]> {
        const tarefas = await this.model.find({"aula.professor": professor}).populate("aula").populate("arquivos");
        if(!tarefas.length) null;
        return tarefas;
    }

    async getId(_id: string, professor: Professor): Promise<Tarefa> {
        const tarefa = await this.model.findOne({ _id, "aula.professor": professor });
        if(!tarefa) null;
        return tarefa;
    }

    async update(tarefa: Tarefa, professor: Professor): Promise<void> {
        await this.model.updateOne({ _id: tarefa._id, "aula.professor": professor}, { $set: tarefa });
    }

    async delete(_id: string, professor: Professor): Promise<void> {
        await this.model.deleteOne({ _id, "aula.professor": professor});
    }
}