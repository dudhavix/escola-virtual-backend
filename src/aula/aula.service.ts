import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { AlunoUpdateFactory } from "../aluno/aluno.factory";
import { MensagemEnum } from "../enum/mensagem.enum";
import { EmitirMensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { AulaCreateViewModel, AulaUpdateViewModel } from "./aula.dto";
import { AulaUpdateEntity } from "./aula.entity";
import { AulaCreateFactory } from "./aula.factory";
import { Aula } from "./aula.interface";
import { AulaRepository } from "./aula.repository";

@Injectable()
export class AulaService {

    private logger = new Logger(AulaService.name);

    constructor(
        @Inject("AulaRepository") private readonly repository: AulaRepository,
    ){ }

    async create(aula: AulaCreateViewModel, professor: Professor): Promise<void> {
        try {
            const entity = AulaCreateFactory(aula, professor);
            await this.repository.create(entity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO);
        }
    }

    async getAll(professor: Professor): Promise<Aula[]> {
        try {
            var aulas = await this.repository.getAll(professor);
            if (!aulas.length) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return aulas;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async getId(_id: string, professor: Professor): Promise<Aula> {
        try {
            var aula = await this.repository.getId(_id, professor);
            if (!aula) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return aula;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async update(aula: AulaUpdateViewModel, professor: Professor): Promise<void> {
        try {
            const entity = AlunoUpdateFactory(aula);
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