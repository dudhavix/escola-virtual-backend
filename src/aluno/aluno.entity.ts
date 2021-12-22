import { Arquivo } from "../arquivo/arquivo.interface";
import { NivelEnum } from "../enum/nivel.enum";
import { StatusEnum } from "../enum/status.enum";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export class AlunoEntity {
    constructor(
        public professor: Professor,
        public turma: Turma,

        public nome: string,
        public email: string,
        public telefone: string,
        public dataNascimento: string,
        public endereco: string,
        public observacao: string,
        public foto: Arquivo,

        public nivelAtual: NivelEnum,
        public nivelMeta: NivelEnum,

        public status: StatusEnum,
    ) { }
}