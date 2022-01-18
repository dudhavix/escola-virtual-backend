import { Inject, Injectable, Logger } from "@nestjs/common";
import { ArquivoRepository } from "./arquivo.repository";
import * as path from "path";
import * as fs from "fs";
import { ArquivoFactory } from "./arquivo.factory";
import { Arquivo } from "./arquivo.interface";
import { EmitirMensagemHelper } from "../helpers/mensagens.helper";
import { Usuario } from "../usuario/usuario.interface";
import { MensagemEnum } from "../enum/mensagem.enum";

@Injectable()
export class ArquivoService {

    private logger = new Logger(ArquivoService.name);

    constructor(
        @Inject("ArquivoRepository") private readonly repository: ArquivoRepository,
    ) { }

    async create(arquivo: Express.Multer.File, usuario: Usuario): Promise<void> {
        try {
            const file = path.join("public", `${Date.now()}.${this.getExtensao(arquivo.originalname)}`);
            const entity = ArquivoFactory(arquivo.originalname, this.getSize(arquivo.size), file.split("\\")[1], arquivo.mimetype, usuario);
            fs.writeFileSync(file, arquivo.buffer);
            await this.repository.create(entity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO);
        }
    }

    async getAll(usuario: Usuario): Promise<Arquivo[]> {
        try {
            var arquivos = await this.repository.getAll(usuario);
            if (!arquivos) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return arquivos;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async getId(_id: string, usuario: Usuario): Promise<Arquivo> {
        try {
            var arquivo = await this.repository.getId(_id, usuario);
            if (!arquivo) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return arquivo;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async delete(_id: string, usuario: Usuario): Promise<void> {
        try {
            const arquivo = await this.repository.getId(_id, usuario);
            const file = path.join("public", `${arquivo.caminho}`);
            fs.unlink(file, function (err) {
                if (err) EmitirMensagemHelper(MensagemEnum.OCORREU_ERRO);
            })
            await this.repository.delete(_id, usuario);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.DELETADO_ERRO);
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
