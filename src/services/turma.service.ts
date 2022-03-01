import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { TurmaCreateFactory } from "../entities/turma.entity";
import { DI_TURMA_REPOSITORY } from "../helpers/container-names";
import { AcaoEnum, MensagensEnum } from "../helpers/index.enum";
import { Turma } from "../interfaces/turma.interface";
import { Usuario } from "../interfaces/usuario.interface";
import { TurmaCreateModel } from "../models/turma.model";
import { TurmaRepository } from "../repositories/turma.repository";
import { AuditoriaService } from "./auditoria.service";

@Injectable()
export class TurmaService {

    private logger = new Logger(TurmaService.name);

    constructor(
        @Inject(DI_TURMA_REPOSITORY) private readonly repository: TurmaRepository,
        private readonly auditoriaServie: AuditoriaService
    ) { }

    async create(turma: TurmaCreateModel): Promise<void> {
        try {
            const entity = TurmaCreateFactory(turma);
            const novaTurma = await this.repository.create(entity);
            await this.auditoriaServie.create(turma.usuario, `${AcaoEnum.criouTurma} ${novaTurma._id}`);
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async getAll(usuario: Usuario): Promise<Turma[]> {
        try {
            const turmas = await this.repository.getAll(usuario);
            if (!turmas) {
                throw new NotFoundException(MensagensEnum.naoEncontrado);
            }
            return turmas;
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async getId(_id: string, usuario: Usuario): Promise<Turma> {
        try {
            const turma = await this.repository.getId(_id, usuario);
            if (!turma) {
                throw new NotFoundException(MensagensEnum.naoEncontrado);
            }
            return turma;
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async delete(_id: string, usuario: Usuario): Promise<void> {
        try {
            await this.repository.delete(_id, usuario);
            await this.auditoriaServie.create(usuario, `${AcaoEnum.deletadoTurma}`);
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }
}