import { Controller, Delete, Get, HttpException, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { Resposta } from "../helpers/resposta.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { Arquivo } from "./arquivo.interface";
import { ArquivoService } from "./arquivo.service";

@UseGuards(AuthGuard("jwt"))
@Controller("api/arquivo")
export class ArquivoController {
    constructor(
        private readonly arquivoService: ArquivoService,
        private readonly usuarioService: UsuarioService
    ) { }

    @Post("/create")
    @UseInterceptors(FileInterceptor("file"))
    async create(
        @Req() req: any,
        @UploadedFile("file") arquivo: Express.Multer.File
    ): Promise<any> {
        const usuario = req.user._id;
        return this.arquivoService.create(arquivo, usuario);
    }

    @Get("/getAll")
    async getAll(): Promise<Arquivo[]> {
        return this.arquivoService.getAll();
    }

    @Get("/getId/:arquivo")
    async getId(@Param("arquivo") arquivo: string): Promise<Arquivo> {
        return this.arquivoService.getId(arquivo);
    }

    @Delete("/delete/:arquivo")
    async delete(@Param("arquivo") arquivo: string): Promise<Resposta> {
        return this.arquivoService.delete(arquivo);
    }
}