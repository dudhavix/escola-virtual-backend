import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { DI_ARQUIVO_REPOSITORY } from "../helpers/container-names";
import { ArquivoRepository } from "../repositories/arquivo.repository";
import { Usuario } from "../interfaces/usuario.interface";
import { ArquivoFactory } from "../entities/arquivo.entity";
import { AcaoEnum, MensagensEnum } from "../helpers/index.enum";
import { Arquivo } from "../interfaces/arquivo.interface";
import { AuditoriaService } from "./auditoria.service";

@Injectable()
export class ArquivoService {

    private logger = new Logger(ArquivoService.name);

    constructor(
        @Inject(DI_ARQUIVO_REPOSITORY) private readonly repository: ArquivoRepository,
        private readonly auditoriaServie: AuditoriaService
    ) { }

    async create(arquivo: Express.Multer.File, usuario: Usuario): Promise<void> {
        try {
            const file = path.join("public", `${Date.now()}.${this.getExtensao(arquivo.originalname)}`);
            const entity = ArquivoFactory(arquivo.originalname, this.getSize(arquivo.size), file.split("\\")[1], arquivo.mimetype, usuario);
            fs.writeFileSync(file, arquivo.buffer);
            const novoArquivo = await this.repository.create(entity);
            await this.auditoriaServie.create(usuario, `${AcaoEnum.criouArquivo} ${novoArquivo._id}`);
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async getAll(usuario: Usuario): Promise<Arquivo[]> {
        try {
            var arquivos = await this.repository.getAll(usuario);
            if (!arquivos) throw new NotFoundException(MensagensEnum.naoEncontrado);
            return arquivos;
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async getId(_id: string, usuario: Usuario): Promise<Arquivo> {
        try {
            var arquivo = await this.repository.getId(_id, usuario);
            if (!arquivo) throw new NotFoundException(MensagensEnum.naoEncontrado);
            return arquivo;
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async delete(_id: string, usuario: Usuario): Promise<void> {
        try {
            const arquivo = await this.repository.getId(_id, usuario);
            const file = path.join("public", `${arquivo.caminho}`);
            fs.unlink(file, function (err) {
                if (err) throw new Error(MensagensEnum.erro);
            })
            await this.repository.delete(_id, usuario);
            await this.auditoriaServie.create(usuario, `${AcaoEnum.deletadoArquivo}`);
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
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
