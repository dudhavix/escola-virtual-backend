import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ArquivoRepository } from "./arquivo.repository";
import * as path from "path";
import * as fs from "fs";
import { ArquivoFactory } from "./arquivo.factory";
import { Arquivo } from "./arquivo.interface";
import { Resposta } from "../helpers/resposta.interface";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Usuario } from "../usuario/usuario.interface";

@Injectable()
export class ArquivoService {

    private logger = new Logger(ArquivoService.name);

    constructor(
        @Inject("ArquivoRepository") private readonly repository: ArquivoRepository,
    ) { }

    async create(arquivo: Express.Multer.File, usuario: Usuario): Promise<Resposta> {
        try {
            const file = path.join("public", `${Date.now()}.${this.getExtensao(arquivo.originalname)}`);
            const entity = ArquivoFactory(arquivo.originalname, this.getSize(arquivo.size), file.split("\\")[1], arquivo.mimetype, usuario);
            fs.writeFileSync(file, arquivo.buffer);
            await this.repository.create(entity)
            return { status: HttpStatus.CREATED, menssagem: MensagemHelper.CRIADO_SUCESSO }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.CRIADO_ERRO);
        }
    }

    async getAll(): Promise<Arquivo[]> {
        var arquivos = await this.repository.getAll();
        if (!arquivos.length) {
            throw new NotFoundException(MensagemHelper.NADA_ENCONTRADO);
        }
        return arquivos;
    }

    async getId(_id: string): Promise<Arquivo> {
        var arquivo = await this.repository.getId(_id);
        if (!arquivo) {
            throw new NotFoundException(MensagemHelper.NADA_ENCONTRADO);
        }
        return arquivo;
    }

    async delete(_id: string): Promise<Resposta> {
        try {
            const arquivo = await this.repository.getId(_id);
            const file = path.join("public", `${arquivo.caminho}`);
            fs.unlink(file, function (err) {
                if (err) throw new BadRequestException("Desculpe ocorreu um erro");
            })
            await this.repository.delete(_id);
            return { status: HttpStatus.OK, menssagem: MensagemHelper.DELETADO_SUCESSO }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.OCORREU_ERRO);
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
            return `${(fileSize / 1024).toFixed(1)} KB`;
        }

        if (fileSize < Math.pow(1024, 3)) {
            return `${(fileSize / Math.pow(1024, 2)).toFixed(1)} MB`;
        }

        else {
            return `${(fileSize / Math.pow(1024, 3)).toFixed(1)} GB`;
        }
    }
}
