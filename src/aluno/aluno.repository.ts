import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Professor } from "../professor/professor.interface";
import { Usuario } from "../usuario/usuario.interface";
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
        const alunos = await this.model.find({professor}, ["usuario", "turma", "nivelAtual"]).populate("usuario", ["nome", "email", "foto", "status"]).populate("turma", ["tag", "nome"]);
        if (!alunos.length) null;
        return alunos;
    }

    async getId(_id: string, professor: Professor): Promise<Aluno> {
        const aluno = await this.model.findOne({ _id, professor }, ["usuario", "turma", "endereco", "observacao", "nivelAtual", "nivelMeta"]).populate("usuario", ["nome", "email", "foto", "status"]).populate("turma", ["tag", "nome"]);
        if (!aluno) null;
        return aluno;
    }

    async update(aluno: Aluno, professor: Professor): Promise<void> {
        await this.model.updateOne({ _id: aluno._id, professor }, { $set: aluno });
    }

    async recuperarId(usuario: Usuario): Promise<Aluno> {
        return this.model.findOne({usuario});
    }
}