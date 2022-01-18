import { Inject, Injectable, Logger } from "@nestjs/common";
import { TurmaCreateViewModel, TurmaUpdateViewModel } from "src/turma/turma.dto";
import { Professor } from "../professor/professor.interface";
import { Turma } from "./turma.interface";
import { TurmaRepository } from "./turma.repository";
import { EmitirMensagemHelper } from "../helpers/mensagens.helper";
import { TurmaCreateFactory, TurmaUpdateFactory } from "./turma.factory";

@Injectable()
export class TurmaService {

    private logger = new Logger(TurmaService.name);

    constructor(
        @Inject("TurmaRepository") private readonly repository: TurmaRepository,
    ) { }

    async create(turma: TurmaCreateViewModel, professor: Professor): Promise<void> {
        try {
            const entity = TurmaCreateFactory(turma, professor);
            await this.repository.create(entity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(7);
        }
    }

    async getAll(professor: Professor): Promise<Turma[]> {
        try {
            const turmas = await this.repository.getAll(professor);
            if (!turmas) EmitirMensagemHelper(5);
            return turmas;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(6);
        }
    }

    async getId(_id: string, professor: Professor): Promise<Turma> {
        try {
            const turma = await this.repository.getId(_id, professor);
            if (!turma) EmitirMensagemHelper(5);
            return turma;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(6);
        }
    }

    async update(turma: TurmaUpdateViewModel, professor: Professor): Promise<void> {
        try {
            const entity = TurmaUpdateFactory(turma);
            await this.repository.update(entity, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(9);
        }
    }

    async delete(_id: string, professor: Professor): Promise<void> {
        try {
            await this.repository.delete(_id, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(8);
        }
    }
}