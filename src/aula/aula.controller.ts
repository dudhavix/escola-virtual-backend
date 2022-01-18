import { Body, Controller, Delete, Get, Header, Headers, HttpException, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { Token } from "../usuario/usuario.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { AulaCreateViewModel, AulaUpdateViewModel } from "./aula.dto";
import { Aula } from "./aula.interface";
import { AulaService } from "./aula.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/aula")
export class AulaController {

    constructor(
        private readonly aulaService: AulaService,
        private readonly usuarioService: UsuarioService
    ) { }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(
        @Req() req: Token,
        @Body() aula: AulaCreateViewModel
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.aulaService.create(aula, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll(@Req() req: Token): Promise<Aula[]> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.aulaService.getAll(professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getId/:aula")
    async getId(
        @Req() req: Token,
        @Param("aula") aula: string
    ): Promise<Aula> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.aulaService.getId(aula, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update(
        @Req() req: Token,
        @Body() aula: AulaUpdateViewModel): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.aulaService.update(aula, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Delete("/delete/:aula")
    async delete(
        @Req() req: Token,
        @Param("aula") aula: string): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.aulaService.delete(aula, professor);
    }
}