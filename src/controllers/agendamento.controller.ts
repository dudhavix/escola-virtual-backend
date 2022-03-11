import { Body, Controller, Delete, Get, Param, Post, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AcessoEnum, MensagensEnum } from "../helpers/index.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { NivelAcessoGuard } from "../helpers/nivelacesso.guard";
import { Agendamento } from "../interfaces/agendamento.interface";
import { Token } from "../interfaces/usuario.interface";
import { AgendamentoCreateModel } from "../models/agendamento.model";
import { AgendamentoService } from "../services/agendamento.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/agendamento")
export class AgendamentoController {

    constructor(
        private readonly agendamentoService: AgendamentoService
    ) { }

    @NivelAcessoDecorator(AcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(
        @Req() req: Token,
        @Body() agendamento: AgendamentoCreateModel
    ): Promise<void> {
        return this.agendamentoService.create(agendamento, req.user._id);
    }

    @NivelAcessoDecorator(AcessoEnum.professor)
    @Get("/getAll")
    async getAll(
        @Req() req: Token,
    ): Promise<Agendamento[]> {
        return this.agendamentoService.getAll(req.user._id);
    }

    @NivelAcessoDecorator(AcessoEnum.professor)
    @Get("/getId/:agendamento")
    async getId(
        @Req() req: Token,
        @Param("agendamento") agendamento: string
    ): Promise<Agendamento> {
        return this.agendamentoService.getId(agendamento, req.user._id);
    }
}