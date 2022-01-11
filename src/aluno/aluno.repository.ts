import { BadRequestException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MensagemHelper } from "../helpers/mensagens.helper";
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
        return this.model.find({professor}, ["usuario", "turma", "nivelAtual"]).populate("usuario", ["nome", "email", "foto", "status"]).populate("turma", ["tag", "nome"]);
    }

    async getId(_id: string, professor: Professor): Promise<Aluno> {
        return this.model.findOne({ _id, professor }, ["usuario", "turma", "endereco", "observacao", "nivelAtual", "nivelMeta"]).populate("usuario", ["nome", "email", "foto", "status"]).populate("turma", ["tag", "nome"]);
    }

    async update(aluno: Aluno, professor: Professor): Promise<void> {
        const update = await this.model.findOneAndUpdate({ _id: aluno._id, professor }, { $set: aluno });
        if (!update) throw new BadRequestException("Aluno não pertence ao professor.");
    }

    async recuperarId(usuario: Usuario): Promise<Aluno> {
        return this.model.findOne({usuario});
    }
}