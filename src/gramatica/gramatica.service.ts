import { Inject, Injectable, Logger } from "@nestjs/common";
import { MensagemEnum } from "../enum/mensagem.enum";
import { EmitirMensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { GramaticaCreateViewModel, GramaticaUpdateViewModel } from "./gramatica.dto";
import { GramaticaCreateFactory, GramaticaUpdateFactory } from "./gramatica.factory";
import { Gramatica } from "./gramatica.interface";
import { GramaticaRepository } from "./gramatica.repository";

@Injectable()
export class GramaticaService {
    private logger = new Logger(GramaticaService.name);

    constructor(
        @Inject("GramaticaRepository") private readonly repository: GramaticaRepository,
    ){ }

    async create(gramatica: GramaticaCreateViewModel, professor: Professor): Promise<void> {
        try {
            const entity = GramaticaCreateFactory(gramatica, professor);
            await this.repository.create(entity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO);
        }
    }

    async getAll(professor: Professor): Promise<Gramatica[]> {
        try {
            var gramaticas = await this.repository.getAll(professor);
            if (!gramaticas) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return gramaticas;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async getId(_id: string, professor: Professor): Promise<Gramatica> {
        try {
            var gramatica = await this.repository.getId(_id, professor);
            if (!gramatica) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return gramatica;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async update(gramatica: GramaticaUpdateViewModel, professor: Professor): Promise<void> {
        try {
            const entity = GramaticaUpdateFactory(gramatica);
            await this.repository.update(entity, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.ALTERACOES_ERRO)
        }
    }

    async delete(_id: string, professor: Professor): Promise<void> {
        try {
            await this.repository.delete(_id, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.DELETADO_ERRO)
        }
    }
}