import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { Resposta } from "../helpers/resposta.interface";
import { UsuarioAlunoViewModel, UsuarioProfessorViewModel, UsuarioUpdateViewModel } from "./usuario.dto";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.interface";

@Controller("api/usuario")
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService
    ) { }

    @Post("/create-professor")
    @UsePipes(ValidationPipe)
    async createProfessor(@Body() usuario: UsuarioProfessorViewModel): Promise<Resposta> {
        return this.usuarioService.createProfessor(usuario);
    }

    @UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create-aluno")
    @UsePipes(ValidationPipe)
    async createAluno(
        @Req() req: any,
        @Body() usuario: UsuarioAlunoViewModel
    ): Promise<Resposta> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.usuarioService.createAluno(usuario, professor);
    }

    @UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
    @Put("/ativar/:usuario")
    async ativar(
        @Param("usuario") usuario: string
    ): Promise<Resposta> {
        return this.usuarioService.ativar(usuario);
    }

    @UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/desativar/:usuario")
    @UsePipes(ValidationPipe)
    async desativar(
        @Param("usuario") usuario: string
    ): Promise<Resposta> {
        return this.usuarioService.desativar(usuario);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put("/update")
    async update(
        @Body() usuario: UsuarioUpdateViewModel
    ): Promise<Resposta> {
        return this.usuarioService.update(usuario);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/perfil")
    async perfil(
        @Req() req: any,
    ): Promise<Usuario> {
        const usuario = req.user._id;
        return this.usuarioService.getId(usuario);
    }

    //APENAS PARA VISUALIZAR REMOVER DEPOIS
    @Get("/professor")
    async getAll(): Promise<any> {
        return this.usuarioService.getAll();
    }

}