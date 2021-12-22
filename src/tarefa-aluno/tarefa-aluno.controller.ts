import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Aluno } from "../aluno/aluno.interface";
import { Professor } from "../professor/professor.interface";
import { Tarefa } from "../tarefa/tarefa.interface";
import { TarefaAlunoCreateViewModel, TarefaAlunoUpdateViewModel } from "./tarefa-aluno.dto";
import { TarefaAlunoService } from "./tarefa-aluno.service";

@Controller("api/tarefa-aluno")
export class TarefaAlunoController {

    constructor(
        private readonly tarefaAlunoService: TarefaAlunoService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() tarefaAluno: TarefaAlunoCreateViewModel ): Promise<HttpException> {
        return this.tarefaAlunoService.create(tarefaAluno);
    }

    @Get("/getAllTarefa/:tarefa")
    async getAllTarefa( @Param("tarefa") tarefa: Tarefa, @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaAlunoService.getAllTarefa(tarefa);
    }

    @Get("/getAllAluno/:aluno")
    async getAllAula( @Param("aluno") aluno: Aluno, @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaAlunoService.getAllAluno(aluno);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaAlunoService.getAll();
    }

    @Get("/getId/:tarefaAluno")
    async getId( @Param("tarefaAluno") tarefaAluno: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaAlunoService.getId(tarefaAluno);
    }

    @Put("/update")
    async update( @Body() tarefaAluno: TarefaAlunoUpdateViewModel ): Promise<HttpException> {
        return this.tarefaAlunoService.update(tarefaAluno);
    }

    @Delete("/delete/:tarefaAluno")
    async delete( @Param("tarefaAluno") tarefaAluno: string ): Promise<HttpException> {
        return this.tarefaAlunoService.delete(tarefaAluno);
    }
}