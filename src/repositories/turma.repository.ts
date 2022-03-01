import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TurmaDocument } from "../entities/turma.entity";
import { DI_TURMA_SCHEMA } from "../helpers/container-names";
import { Turma } from "../interfaces/turma.interface";
import { Usuario } from "../interfaces/usuario.interface";

export class TurmaRepository {

    constructor(
        @InjectModel(DI_TURMA_SCHEMA) private readonly model: Model<TurmaDocument>,
    ) { }

    async create(turma: Turma): Promise<Turma> {
        return await new this.model(turma).save();
    }

    async getAll(usuario: Usuario): Promise<Turma[]> {
        const turmas = await this.model.find({ usuario }, ["tag", "nome", "frequencia"]);
        if (!turmas.length) return null;
        return turmas;
    }

    async getId(_id: string, usuario: Usuario): Promise<Turma> {
        const turma = await this.model.findOne({ _id, usuario }, ["tag", "nome", "frequencia"]);
        if (!turma) return null;
        return turma;
    }

    async update(turma: Turma, usuario: Usuario): Promise<void> {
        await this.model.updateOne({ _id: turma._id, usuario }, { $set: turma });
    }

    async delete(_id: string, usuario: Usuario): Promise<void> {
        await this.model.deleteOne({ _id, usuario });
    }
}