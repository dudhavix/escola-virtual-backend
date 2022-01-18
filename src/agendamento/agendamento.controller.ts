import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Token } from "../usuario/usuario.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { AgendamentoCreateViewModel, AgendamentoUpdateViewModel } from "./agendamento.dto";
import { Agendamento } from "./agendamento.interface";
import { AgendamentoService } from "./agendamento.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/agendamento")
export class AgendamentoController {
    constructor(
        private readonly agendamentoService: AgendamentoService,
        private readonly usuarioService: UsuarioService
    ) { }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(
        @Req() req: Token,
        @Body() agendamento: AgendamentoCreateViewModel
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.agendamentoService.create(agendamento, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll(
        @Req() req: Token,
    ): Promise<Agendamento[]> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.agendamentoService.getAll(professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getId/:agendamento")
    async getId(
        @Req() req: Token,
        @Param("agendamento") agendamento: string
    ): Promise<Agendamento> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.agendamentoService.getId(agendamento, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/remarcar")
    async remarcar(
        @Req() req: Token,
        @Body() agendamento: AgendamentoUpdateViewModel
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.agendamentoService.remarcar(agendamento, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/cancelar/:agendamento")
    async cancelar(
        @Req() req: Token,
        @Param("agendamento") agendamento: string
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.agendamentoService.cancelar(agendamento, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/concluida/:agendamento")
    async concluida(
        @Req() req: Token,
        @Param("agendamento") agendamento: string
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.agendamentoService.concluir(agendamento, professor);
    }
}