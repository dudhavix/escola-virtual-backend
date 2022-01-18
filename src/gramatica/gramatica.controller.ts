import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Token } from "../usuario/usuario.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { GramaticaCreateViewModel, GramaticaUpdateViewModel } from "./gramatica.dto";
import { Gramatica } from "./gramatica.interface";
import { GramaticaService } from "./gramatica.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/gramatica")
export class GramaticaController {
    constructor(
        private readonly gramaticaService: GramaticaService,
        private readonly usuarioService: UsuarioService
    ) { }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(
        @Req() req: Token,
        @Body() gramatica: GramaticaCreateViewModel): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.gramaticaService.create(gramatica, professor);
    }

    @Get("/getAll")
    async getAll(
        @Req() req: Token,
    ): Promise<Gramatica[]> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.gramaticaService.getAll(professor);
    }

    @Get("/getId/:gramatica")
    async getId(
        @Req() req: Token,
        @Param("gramatica") gramatica: string
    ): Promise<any> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.gramaticaService.getId(gramatica, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update(
        @Req() req: Token,
        @Body() gramatica: GramaticaUpdateViewModel
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.gramaticaService.update(gramatica, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Delete("/delete/:gramatica")
    async delete(
        @Req() req: Token,
        @Param("gramatica") gramatica: string
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.gramaticaService.delete(gramatica, professor);
    }
}