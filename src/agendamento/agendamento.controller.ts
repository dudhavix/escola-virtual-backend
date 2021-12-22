import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Professor } from "../professor/professor.interface";
import { AgendamentoCreateViewModel, AgendamentoUpdateViewModel } from "./agendamento.dto";
import { AgendamentoService } from "./agendamento.service";

@Controller("api/agendamento")
export class AgendamentoController {
    constructor(
        private readonly agendamentoService: AgendamentoService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() agendamento: AgendamentoCreateViewModel ): Promise<HttpException> {
        return this.agendamentoService.create(agendamento);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.agendamentoService.getAll(professor);
    }

    @Get("/getId/:agendamento")
    async getId( @Param("agendamento") agendamento: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.agendamentoService.getId(agendamento);
    }

    @Put("/update")
    async update( @Body() agendamento: AgendamentoUpdateViewModel ): Promise<HttpException> {
        return this.agendamentoService.update(agendamento);
    }

    @Delete("/delete/:agendamento")
    async delete( @Param("agendamento") agendamento: string ): Promise<HttpException> {
        return this.agendamentoService.delete(agendamento);
    }
}