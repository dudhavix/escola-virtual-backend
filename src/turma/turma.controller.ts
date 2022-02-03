import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TurmaService } from "src/turma/turma.service";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Token } from "../usuario/usuario.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { TurmaCreateViewModel, TurmaUpdateViewModel } from "./turma.dto";
import { Turma } from "./turma.interface";

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
        @Req() req: Token,
        @Body() turma: TurmaCreateViewModel
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.turmaService.create(turma, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll(
        @Req() req: Token,
    ): Promise<Turma[]> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.turmaService.getAll(professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getId/:turma")
    async getId(
        @Req() req: Token,
        @Param("turma") turma: string
    ): Promise<Turma> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.turmaService.getId(turma, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update(
        @Req() req: Token,
        @Body() turma: TurmaUpdateViewModel
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.turmaService.update(turma, professor);
    }

    @Delete("/delete/:turma")
    async delete(
        @Req() req: Token,
        @Param("turma") turma: string
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.turmaService.delete(turma, professor);
    }
}