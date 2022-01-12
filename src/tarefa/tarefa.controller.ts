import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { TarefaCreateViewModel, TarefaUpdateViewModel } from "./tarefa.dto";
import { TarefaService } from "./tarefa.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/tarefa")
export class TarefaController {
    constructor(
        private readonly tarefaService: TarefaService
    ){}

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() tarefa: TarefaCreateViewModel ): Promise<HttpException> {
        return this.tarefaService.create(tarefa);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaService.getAll();
    }

    @Get("/getId/:tarefa")
    async getId( @Param("tarefa") tarefa: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaService.getId(tarefa);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update( @Body() tarefa: TarefaUpdateViewModel ): Promise<HttpException> {
        return this.tarefaService.update(tarefa);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Delete("/delete/:tarefa")
    async delete( @Param("tarefa") tarefa: string ): Promise<HttpException> {
        return this.tarefaService.delete(tarefa);
    }
}