import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AcessoEnum } from "../helpers/index.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { NivelAcessoGuard } from "../helpers/nivelacesso.guard";
import { Token } from "../interfaces/usuario.interface";
import { UsuarioCreateModel } from "../models/usuario.model";
import { UsuarioService } from "../services/usuario.service";


@Controller("api/usuario")
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService
    ) { }

    @UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
    @NivelAcessoDecorator(AcessoEnum.admin)
    @Post("create-professor")
    async createProfessor( @Req() req: Token , @Body() usuario: UsuarioCreateModel ): Promise<void> {
        return this.usuarioService.create(usuario, req.user._id);
    }

    @Get("ativar/:id")
    async ativar( @Param("id") id: string ): Promise<void> {
        return this.usuarioService.ativar(id);
    }

    @UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
    @NivelAcessoDecorator(AcessoEnum.professor)
    @Post("create-aluno")
    async createAluno( @Req() req: Token , @Body() usuario: UsuarioCreateModel ): Promise<void> {
        return this.usuarioService.create(usuario, req.user._id);
    }
}