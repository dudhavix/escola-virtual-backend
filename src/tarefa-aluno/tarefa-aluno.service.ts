import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Aluno } from "../aluno/aluno.interface";
import { StatusEnum } from "../enum/status.enum";
import { Tarefa } from "../tarefa/tarefa.interface";
import { TarefaAlunoCreateViewModel, TarefaAlunoUpdateViewModel } from "./tarefa-aluno.dto";
import { TarefaAlunoFactory, TarefaAlunoStatusFactory } from "./tarefa-aluno.factory";
import { TarefaAluno } from "./tarefa-aluno.interface";
import { TarefaAlunoRepository } from "./tarefa-aluno.repository";

@Injectable()
export class TarefaAlunoService {

    private logger = new Logger(TarefaAlunoService.name);

    constructor(
        @Inject("TarefaAlunoRepository") private readonly repository: TarefaAlunoRepository,
    ){ }

    async create(tarefaAula: TarefaAlunoCreateViewModel): Promise<HttpException> {
        try {
            const entity = TarefaAlunoFactory(tarefaAula);
            await this.repository.create(entity);
            return new HttpException('Tarefa e aluno vinculados', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAllTarefa(tarefa: Tarefa): Promise<TarefaAluno[] | HttpException> {
        //todos os alunos dessa tarefa
        try {
            var alunos = await this.repository.getAllTarefa(tarefa);
            if (!alunos.length) {
                return new HttpException('Nenhum aluno vinculado a essa tarefa', HttpStatus.NOT_FOUND);
            }
            return alunos;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAllAluno(aluno: Aluno): Promise<TarefaAluno[] | HttpException> {
        //todas as tarefas desse aluno
        try {
            var tarefas = await this.repository.getAllAluno(aluno);
            if (!tarefas.length) {
                return new HttpException('Nenhuma tarefa vinculada a esse aluno', HttpStatus.NOT_FOUND);
            }
            return tarefas;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAll(): Promise<TarefaAluno[] | HttpException> {
        try {
            var tarefaAula = await this.repository.getAll();
            if (!tarefaAula.length) {
                return new HttpException('Nenhum vinculo encontrado', HttpStatus.NOT_FOUND);
            }
            return tarefaAula;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<TarefaAluno | HttpException> {
        try {
            var tarefaAula = await this.repository.getId(_id);
            if (!tarefaAula) {
                return new HttpException('Nenhum vinculo encontrado', HttpStatus.NOT_FOUND);
            }
            return tarefaAula;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async update(tarefaAluno: TarefaAlunoUpdateViewModel): Promise<HttpException> {
        try {
            const { _id } = tarefaAluno;
            const entity = TarefaAlunoStatusFactory(tarefaAluno);
            await this.repository.update(entity, _id);
            return new HttpException('O status da tarefa foi atualizado', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.repository.delete(_id);
            return new HttpException('Vinculo excluido', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
}