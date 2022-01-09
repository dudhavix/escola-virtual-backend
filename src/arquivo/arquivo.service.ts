import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { ArquivoRepository } from "./arquivo.repository";
import * as path from "path";
import * as fs from "fs";
import { ArquivoFactory } from "./arquivo.factory";
import { Arquivo } from "./arquivo.interface";

@Injectable()
export class ArquivoService {

    private logger = new Logger(ArquivoService.name);

    constructor(
        @Inject("ArquivoRepository") private readonly repository: ArquivoRepository,
    ) { }

    async create(arquivo: Express.Multer.File): Promise<HttpException> {
        try {
            const file = path.join("public", `${Date.now()}.${this.getExtensao(arquivo.originalname)}`);
            const entity = ArquivoFactory(arquivo.originalname, this.getSize(arquivo.size), file.split("\\")[1], arquivo.mimetype);
            fs.writeFileSync(file, arquivo.buffer);
            await this.repository.create(entity)
            return new HttpException('Arquivo salvo com sucesso', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAll(): Promise<Arquivo[] | HttpException> {
        try {
            var arquivos = await this.repository.getAll();
            if (!arquivos.length) {
                return new HttpException('Nenhum arquivo encontrado', HttpStatus.NOT_FOUND);
            }
            return arquivos;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Arquivo | HttpException> {
        try {
            var arquivo = await this.repository.getId(_id);
            if (!arquivo) {
                return new HttpException('Nenhum arquivo encontrado', HttpStatus.NOT_FOUND);
            }
            return arquivo;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            const arquivo = await this.repository.getId(_id);
            const file = path.join("public", `${arquivo.caminho}`);
            fs.unlink(file, function (err){
                if (err) throw new BadRequestException("Desculpe ocorreu um erro");
            })
            await this.repository.delete(_id);
            return new HttpException('Arquivo excluido', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    private getExtensao(fileName: string): string {
        const nome = fileName.split(".");
        return nome[nome.length - 1];
    }

    private getSize(fileSize: number): string {
        if (fileSize < 1024) {
            return `${fileSize.toFixed(1)} B`;
        }
        
        if (fileSize < Math.pow(1024, 2)) {
            return `${(fileSize/1024).toFixed(1)} KB`;
        }

        if (fileSize < Math.pow(1024, 3)) {
            return `${(fileSize/Math.pow(1024, 2)).toFixed(1)} MB`;
        }

        else {
            return `${(fileSize/Math.pow(1024, 3)).toFixed(1)} GB`;
        }
    }
}
