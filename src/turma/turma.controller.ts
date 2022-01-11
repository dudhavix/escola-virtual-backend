import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TurmaService } from "src/turma/turma.service";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Resposta } from "../helpers/resposta.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { TurmaCreateViewModel, TurmaUpdateViewModel } from "./turma.dto";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/turma")
export class TurmaController {

    constructor(
        private readonly turmaService: TurmaService,
        private readonly usuarioService: UsuarioService
    ) { }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(
        @Req() req: any,
        @Body() turma: TurmaCreateViewModel
    ): Promise<Resposta> {
        const professor = req.user._id;
        return this.turmaService.create(turma, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll(
        @Req() req: any,
    ): Promise<any> {
        const professor = req.user._id;
        return this.turmaService.getAll(professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getId/:turma")
    async getId(
        @Req() req: any,
        @Param("turma") turma: string
    ): Promise<any> {
        const professor = req.user._id;
        return this.turmaService.getId(turma, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update(
        @Req() req: any,
        @Body() turma: TurmaUpdateViewModel
    ): Promise<Resposta> {
        const professor = req.user._id;
        return this.turmaService.update(turma, professor);
    }

    @Delete("/delete/:turma")
    async delete(
        @Req() req: any,
        @Param("turma") turma: string
    ): Promise<any> {
        const professor = req.user._id;
        return this.turmaService.delete(turma, professor);
    }
}