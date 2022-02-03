import { Inject, Injectable, Logger } from "@nestjs/common";
import { TurmaCreateViewModel, TurmaUpdateViewModel } from "src/turma/turma.dto";
import { Professor } from "../professor/professor.interface";
import { Turma } from "./turma.interface";
import { TurmaRepository } from "./turma.repository";
import { EmitirMensagemHelper } from "../helpers/mensagens.helper";
import { TurmaCreateFactory, TurmaUpdateFactory } from "./turma.factory";
import { MensagemEnum } from "../enum/mensagem.enum";

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
            EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO)
        }
    }

    async getAll(professor: Professor): Promise<Turma[]> {
        try {
            const turmas = await this.repository.getAll(professor);
            if (!turmas) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return turmas;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async getId(_id: string, professor: Professor): Promise<Turma> {
        try {
            const turma = await this.repository.getId(_id, professor);
            if (!turma) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return turma;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async update(turma: TurmaUpdateViewModel, professor: Professor): Promise<void> {
        try {
            const entity = TurmaUpdateFactory(turma);
            await this.repository.update(entity, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.ALTERACOES_ERRO);
        }
    }

    async delete(_id: string, professor: Professor): Promise<void> {
        try {
            await this.repository.delete(_id, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.DELETADO_ERRO);
        }
    }
}