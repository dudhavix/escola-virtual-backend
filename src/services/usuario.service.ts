import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UsuarioCreateFactory } from "../entities/usuario.entity";
import { DI_USUARIO_REPOSITORY } from "../helpers/container-names";
import { AcaoEnum, MensagensEnum } from "../helpers/index.enum";
import { Usuario } from "../interfaces/usuario.interface";
import { UsuarioCreateModel } from "../models/usuario.model";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { AuditoriaService } from "./auditoria.service";

@Injectable()
export class UsuarioService {
    private logger = new Logger(UsuarioService.name);

    constructor(
        @Inject(DI_USUARIO_REPOSITORY) private readonly repository: UsuarioRepository,
        private readonly auditoriaServie: AuditoriaService
    ) { }

    async create(novoUsuario: UsuarioCreateModel, realizadoAcao: Usuario): Promise<void>{
        try {
            const entity = UsuarioCreateFactory(novoUsuario);
            const novoAluno = await this.repository.create(entity);
            await this.auditoriaServie.create(realizadoAcao, `${AcaoEnum.criouUsuario} ${novoAluno._id}`);
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async getEmail(email: string): Promise<Usuario>{
        const usuario = await this.repository.getEmail(email);
        if (!usuario) {
            throw new NotFoundException(MensagensEnum.naoEncontrado);
        }
        return usuario;
    }

    async ativar(id: string): Promise<void>{
        try {
            await this.repository.ativar(id);
            await this.auditoriaServie.create(id as unknown as Usuario, `${AcaoEnum.ativarUsuario}`)
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }
}