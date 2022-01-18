import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Aluno } from "../aluno/aluno.interface";
import { AlunoService } from "../aluno/aluno.service";
import { MensagemEnum } from "../enum/mensagem.enum";
import { EmitirMensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { PautaUpdateViewModel } from "./pauta.dto";
import { PautaCreateFactory } from "./pauta.factory";
import { Pauta } from "./pauta.interface";
import { PautaRepository } from "./pauta.repository";

@Injectable()
export class PautaService {
    private logger = new Logger(PautaService.name);

    constructor(
        @Inject("PautaRepository") private readonly repository: PautaRepository,
        private readonly alunoService: AlunoService,
    ) { }

    async create(turma: Turma, professor: Professor): Promise<void> {
        try {
            
            // const entity = PautaCreateFactory(pauta, professor);
            // await this.repository.create(entity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO)
        }
    }

    // async getAll(): Promise<Pauta[]> {
    //     const alunoId = pauta.aluno as unknown;
    //     if (!this.alunoPertenceProfessor(alunoId as string, professor)) EmitirMensagemHelper(MensagemEnum.OPERACAO_NAO_AUTORIZADA);
    //     try {
    //         var pautas = await this.repository.getAll();
    //         if (!pautas.length) {
    //             return new HttpException('Nenhuma pauta encontrada', HttpStatus.NOT_FOUND);
    //         }
    //         return pautas;
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new BadRequestException("Desculpe ocorreu um erro");
    //     }
    // }

    // async getAllAluno(aluno: Aluno): Promise<Pauta[] | HttpException> {
    //     try {
    //         var pautas = await this.repository.getAllAluno(aluno);
    //         if (!pautas.length) {
    //             return new HttpException('Nenhuma pauta encontrada com esse aluno', HttpStatus.NOT_FOUND);
    //         }
    //         return pautas;
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new BadRequestException("Desculpe ocorreu um erro");
    //     }
    // }

    // async getId(_id: string): Promise<Pauta | HttpException> {
    //     try {
    //         var pauta = await this.repository.getId(_id);
    //         if (!pauta) {
    //             return new HttpException('Nenhuma pauta encontrada', HttpStatus.NOT_FOUND);
    //         }
    //         return pauta;
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new BadRequestException("Desculpe ocorreu um erro");
    //     }
    // }

    // async update(pauta: PautaUpdateViewModel): Promise<> {
    //     try {
    //         const { _id, ...info } = pauta;
    //         const entity = PautaCreateFactory(info);
    //         await this.repository.update(entity, _id);
    //         return new HttpException('Pauta atualizada', HttpStatus.OK);
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new BadRequestException("Desculpe ocorreu um erro");
    //     }
    // }

    // async delete(_id: string): Promise<HttpException> {
    //     try {
    //         await this.repository.delete(_id);
    //         return new HttpException('Pauta excluida', HttpStatus.OK);
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new BadRequestException("Desculpe ocorreu um erro");
    //     }
    // }

    // private async alunoPertenceProfessor(alunoId: string, professor: Professor): Promise<boolean>{
    //     const aluno = await this.alunoService.getId(alunoId, professor);
    //     if(aluno) return true;
    //     return false
    // }
}