import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Aluno } from "../aluno/aluno.interface";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { Token } from "../usuario/usuario.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { PautaUpdateViewModel } from "./pauta.dto";
import { Pauta } from "./pauta.interface";
import { PautaService } from "./pauta.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/pauta")
export class PautaController {

    constructor(
        private readonly pautaService: PautaService,
        private readonly usuarioService: UsuarioService
    ) { }

    // @NivelAcessoDecorator(NivelAcessoEnum.professor)
    // @Get("/getAll")
    // async getAll(@Req() req: Token): Promise<Pauta[]> {
    //     const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
    //     return this.pautaService.getAll(professor);
    // }

    // @Get("/getAllAluno/:aluno")
    // async getAllAluno(
    //     @Req() req: Token,
    //     @Param("aluno") aluno: Aluno
    // ): Promise<Pauta[]> {
    //     const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
    //     return this.pautaService.getAllAluno(aluno, professor);
    // }

    // @NivelAcessoDecorator(NivelAcessoEnum.professor)
    // @Get("/getId/:pauta")
    // async getId(
    //     @Req() req: Token,
    //     @Param("pauta") pauta: string): Promise<Pauta> {
    //     const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
    //     return this.pautaService.getId(pauta, professor);
    // }

    // @NivelAcessoDecorator(NivelAcessoEnum.professor)
    // @Put("/update")
    // async update(
    //     @Req() req: Token,
    //     @Body() pauta: PautaUpdateViewModel
    //     ): Promise<void> {
    //     const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
    //     return this.pautaService.update(pauta, professor);
    // }
}