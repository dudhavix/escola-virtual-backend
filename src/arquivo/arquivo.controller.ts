import { Controller, Delete, Get, HttpException, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Arquivo } from "./arquivo.interface";
import { ArquivoService } from "./arquivo.service";

@Controller("api/arquivo")
export class ArquivoController {
    constructor(
        private readonly arquivoService: ArquivoService
    ) { }
    
    @Post("/create")
    @UseInterceptors(FileInterceptor("file"))
    async create(@UploadedFile("file") arquivo: Express.Multer.File): Promise<HttpException> {
        return this.arquivoService.create(arquivo);
    }

    @Get("/getAll")
    async getAll(): Promise<Arquivo[] | HttpException> {
        return this.arquivoService.getAll();
    }

    @Get("/getId/:arquivo")
    async getId( @Param("arquivo") arquivo: string ): Promise<Arquivo | HttpException> {
        return this.arquivoService.getId(arquivo);
    }

    @Delete("/delete/:arquivo")
    async delete( @Param("arquivo") arquivo: string ): Promise<HttpException> {
        return this.arquivoService.delete(arquivo);
    }
}