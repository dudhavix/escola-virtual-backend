import { Controller, Delete, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { Token } from "../usuario/usuario.interface";
import { Arquivo } from "./arquivo.interface";
import { ArquivoService } from "./arquivo.service";

@UseGuards(AuthGuard("jwt"))
@Controller("api/arquivo")
export class ArquivoController {
    constructor(
        private readonly arquivoService: ArquivoService,
    ) { }

    @Post("/create")
    @UseInterceptors(FileInterceptor("file"))
    async create(
        @Req() req: Token,
        @UploadedFile("file") arquivo: Express.Multer.File
    ): Promise<void> {
        const usuario = req.user._id;
        return this.arquivoService.create(arquivo, usuario);
    }

    @Get("/getAll")
    async getAll(
        @Req() req: Token,
    ): Promise<Arquivo[]> {
        const usuario = req.user._id;
        return this.arquivoService.getAll(usuario);
    }

    @Get("/getId/:arquivo")
    async getId(
        @Req() req: Token,
        @Param("arquivo") arquivo: string
    ): Promise<Arquivo> {
        const usuario = req.user._id;
        return this.arquivoService.getId(arquivo, usuario);
    }

    @Delete("/delete/:arquivo")
    async delete(
        @Req() req: Token,
        @Param("arquivo") arquivo: string
    ): Promise<void> {
        const usuario = req.user._id;
        return this.arquivoService.delete(arquivo, usuario);
    }
}