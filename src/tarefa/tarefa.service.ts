import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { MensagemEnum } from "../enum/mensagem.enum";
import { EmitirMensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { TarefaCreateViewModel, TarefaUpdateViewModel } from "./tarefa.dto";
import { TarefaFactory } from "./tarefa.factory";
import { Tarefa } from "./tarefa.interface";
import { TarefaRepository } from "./tarefa.repository";

@Injectable()
export class TarefaService {
    private logger = new Logger(TarefaService.name);

    constructor(
        @Inject("TarefaRepository") private readonly repository: TarefaRepository,
    ){ }

    async create(tarefa: TarefaCreateViewModel): Promise<void> {
        try {
            const entity = TarefaFactory(tarefa);
            await this.repository.create(entity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO);
        }
    }

    async getAll(professor: Professor): Promise<Tarefa[]> {
        try {
            var tarefas = await this.repository.getAll(professor);
            if (!tarefas) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return tarefas;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async getId(_id: string, professor: Professor): Promise<Tarefa> {
        try {
            var tarefa = await this.repository.getId(_id, professor);
            if (!tarefa) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return tarefa;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    // async update(tarefa: TarefaUpdateViewModel): Promise<HttpException> {
    //     try {
    //         const { _id, ...info} = tarefa;
    //         const entity = TarefaFactory(info);
    //         await this.repository.update(entity, _id);
    //         return new HttpException('Tarefa atualizada', HttpStatus.OK);
    //     } catch (error) {
    //         this.logger.error(error);
    //         EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO);
    //     }
    // }

    // async delete(_id: string): Promise<HttpException> {
    //     try {
    //         await this.repository.delete(_id);
    //         return new HttpException('Tarefa excluida', HttpStatus.OK);
    //     } catch (error) {
    //         this.logger.error(error);
    //         EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO);
    //     }
    // }
}