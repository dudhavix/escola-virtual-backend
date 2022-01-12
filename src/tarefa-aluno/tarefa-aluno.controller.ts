import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Aluno } from "../aluno/aluno.interface";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { Tarefa } from "../tarefa/tarefa.interface";
import { TarefaAlunoCreateViewModel, TarefaAlunoUpdateViewModel } from "./tarefa-aluno.dto";
import { TarefaAlunoService } from "./tarefa-aluno.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/tarefa-aluno")
export class TarefaAlunoController {

    constructor(
        private readonly tarefaAlunoService: TarefaAlunoService
    ){}

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() tarefaAluno: TarefaAlunoCreateViewModel ): Promise<HttpException> {
        return this.tarefaAlunoService.create(tarefaAluno);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAllTarefa/:tarefa")
    async getAllTarefa( @Param("tarefa") tarefa: Tarefa, @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaAlunoService.getAllTarefa(tarefa);
    }

    @Get("/getAllAluno/:aluno")
    async getAllAula( @Param("aluno") aluno: Aluno, @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaAlunoService.getAllAluno(aluno);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaAlunoService.getAll();
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getId/:tarefaAluno")
    async getId( @Param("tarefaAluno") tarefaAluno: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaAlunoService.getId(tarefaAluno);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update( @Body() tarefaAluno: TarefaAlunoUpdateViewModel ): Promise<HttpException> {
        return this.tarefaAlunoService.update(tarefaAluno);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Delete("/delete/:tarefaAluno")
    async delete( @Param("tarefaAluno") tarefaAluno: string ): Promise<HttpException> {
        return this.tarefaAlunoService.delete(tarefaAluno);
    }
}