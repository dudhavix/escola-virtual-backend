import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Professor } from "../professor/professor.interface";
import { TarefaCreateViewModel, TarefaUpdateViewModel } from "./tarefa.dto";
import { TarefaService } from "./tarefa.service";

@Controller("api/tarefa")
export class TarefaController {
    constructor(
        private readonly tarefaService: TarefaService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() tarefa: TarefaCreateViewModel ): Promise<HttpException> {
        return this.tarefaService.create(tarefa);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaService.getAll();
    }

    @Get("/getId/:tarefa")
    async getId( @Param("tarefa") tarefa: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.tarefaService.getId(tarefa);
    }

    @Put("/update")
    async update( @Body() tarefa: TarefaUpdateViewModel ): Promise<HttpException> {
        return this.tarefaService.update(tarefa);
    }

    @Delete("/delete/:tarefa")
    async delete( @Param("tarefa") tarefa: string ): Promise<HttpException> {
        return this.tarefaService.delete(tarefa);
    }
}