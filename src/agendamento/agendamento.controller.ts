import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { AgendamentoCreateViewModel, AgendamentoUpdateViewModel } from "./agendamento.dto";
import { AgendamentoService } from "./agendamento.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/agendamento")
export class AgendamentoController {
    constructor(
        private readonly agendamentoService: AgendamentoService
    ){}

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() agendamento: AgendamentoCreateViewModel ): Promise<HttpException> {
        return this.agendamentoService.create(agendamento);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.agendamentoService.getAll(professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getId/:agendamento")
    async getId( @Param("agendamento") agendamento: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.agendamentoService.getId(agendamento);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update( @Body() agendamento: AgendamentoUpdateViewModel ): Promise<HttpException> {
        return this.agendamentoService.update(agendamento);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Delete("/delete/:agendamento")
    async delete( @Param("agendamento") agendamento: string ): Promise<HttpException> {
        return this.agendamentoService.delete(agendamento);
    }
}