import { Inject, Injectable, Logger } from "@nestjs/common";
import { DI_AUDITORIA_REPOSITORY } from "../helpers/container-names";
import { MensagensEnum } from "../helpers/index.enum";
import { Auditoria } from "../interfaces/auditoria.interface";
import { Usuario } from "../interfaces/usuario.interface";
import { AuditoriaRepository } from "../repositories/auditoria.repository";

@Injectable()
export class AuditoriaService {
    private logger = new Logger(AuditoriaService.name);

    constructor(
        @Inject(DI_AUDITORIA_REPOSITORY) private readonly repository: AuditoriaRepository,
    ) { }

    async create(usuarioQueFazAcao: Usuario, acao: string): Promise<void>{
        try {
            const entity:Auditoria = {
                dataHora: new Date().toISOString(),
                acao,
                usuario: usuarioQueFazAcao
            }
            await this.repository.create(entity)
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }
}