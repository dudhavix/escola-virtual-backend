import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AcessoEnum, MensagensEnum } from "../helpers/index.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { NivelAcessoGuard } from "../helpers/nivelacesso.guard";
import { Turma } from "../interfaces/turma.interface";
import { Token } from "../interfaces/usuario.interface";
import { TurmaCreateModel } from "../models/turma.model";
import { TurmaService } from "../services/turma.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/turma")
export class TurmaController {

    constructor(
        private readonly turmaService: TurmaService
    ) { }

    @NivelAcessoDecorator(AcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(
        @Req() req: Token,
        @Body() turma: TurmaCreateModel
    ): Promise<void> {
        if(req.user._id != turma.usuario) throw new UnauthorizedException(MensagensEnum.naoAutorizadoOperacao);
        return this.turmaService.create(turma);
    }

    @NivelAcessoDecorator(AcessoEnum.professor)
    @Get("/getAll")
    async getAll(
        @Req() req: Token,
    ): Promise<Turma[]> {
        return this.turmaService.getAll(req.user._id);
    }

    @NivelAcessoDecorator(AcessoEnum.professor)
    @Get("/getId/:turma")
    async getId(
        @Req() req: Token,
        @Param("turma") turma: string
    ): Promise<Turma> {
        return this.turmaService.getId(turma, req.user._id);
    }

    @Delete("/delete/:turma")
    async delete(
        @Req() req: Token,
        @Param("turma") turma: string
    ): Promise<void> {
        return this.turmaService.delete(turma, req.user._id);
    }
}