import { BadRequestException, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { Turma } from "./turma.interface";
import { TurmaDocument } from "./turma.schema";

export class TurmaRepository {

    private logger = new Logger(TurmaRepository.name);

    constructor(
        @InjectModel("Turma") private readonly model: Model<TurmaDocument>,
    ) { }

    async create(turma: Turma): Promise<void> {
        try {
            await new this.model(turma).save();
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.CRIADO_ERRO);
        }
    }

    async getAll(professor: Professor): Promise<Turma[]> {
        try {
            const turmas = await this.model.find({ professor }, ["tag", "nome", "frequencia"]);
            if (!turmas.length) throw new BadRequestException(MensagemHelper.NADA_ENCONTRADO);
            return turmas;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.NADA_ENCONTRADO_ERRO);
        }
    }

    async getId(_id: string, professor: Professor): Promise<Turma> {
        try {
            const turma = await this.model.findOne({ _id, professor }, ["tag", "nome", "frequencia"]);
            if (!turma) throw new BadRequestException(MensagemHelper.NADA_ENCONTRADO);
            return turma;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.NADA_ENCONTRADO_ERRO);
        }
    }

    async update(turma: Turma, professor: Professor): Promise<void> {
        try {
            await this.model.findByIdAndUpdate({ _id: turma._id, professor }, { $set: turma });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.ALTERACOES_NAO_REALIZADAS);
        }
    }

    async delete(_id: string, professor: Professor): Promise<void> {
        try {
            const turma = await this.model.findOne({ _id, professor })
            if (!turma) throw new BadRequestException(MensagemHelper.NADA_ENCONTRADO);
            await this.model.deleteOne({ _id, professor });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.DELETADO_ERRO);
        }
    }
} 