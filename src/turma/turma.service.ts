import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { TurmaCreateViewModel, TurmaUpdateViewModel } from "src/turma/turma.dto";
import { Professor } from "../professor/professor.interface";
import { Turma } from "./turma.interface";
import { TurmaRepository } from "./turma.repository";
import { Resposta } from "../helpers/resposta.interface";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { TurmaCreateFactory, TurmaUpdateFactory } from "./turma.factory";

@Injectable()
export class TurmaService {

    private logger = new Logger(TurmaService.name);

    constructor(
        @Inject("TurmaRepository") private readonly repository: TurmaRepository,
    ) { }

    async create(turma: TurmaCreateViewModel, professor: Professor): Promise<Resposta> {
        try {
            const entity = TurmaCreateFactory(turma, professor);
            await this.repository.create(entity);
            return { menssagem: MensagemHelper.CRIADO_SUCESSO, status: HttpStatus.CREATED }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.OCORREU_ERRO);
        }
    }

    async getAll(professor: Professor): Promise<Turma[] | HttpException> {
        var turmas = await this.repository.getAll(professor);
        if (!turmas.length) {
            throw new NotFoundException(MensagemHelper.NADA_ENCONTRADO);
        }
        return turmas;
    }

    async getId(_id: string, professor: Professor): Promise<Turma> {
        var turma = await this.repository.getId(_id, professor);
        if (!turma) {
            throw new NotFoundException(MensagemHelper.NADA_ENCONTRADO);
        }
        return turma;
    }

    async update(turma: TurmaUpdateViewModel, professor: Professor): Promise<Resposta> {
        try {
            const entity = TurmaUpdateFactory(turma);
            await this.repository.update(entity, professor);
            return { menssagem: MensagemHelper.ALTERACOES_REALIZADAS, status: HttpStatus.CREATED }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.OCORREU_ERRO);
        }
    }

    async delete(_id: string, professor: Professor): Promise<Resposta> {
        try {
            await this.repository.delete(_id, professor);
            return { menssagem: MensagemHelper.DELETADO_SUCESSO, status: HttpStatus.OK }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.OPERACAO_NAO_AUTORIZADA);
        }
    }
}