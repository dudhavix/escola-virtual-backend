import { NivelEnum } from "../enum/nivel.enum";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { Usuario } from "../usuario/usuario.interface";

export class AlunoEntity {
    constructor(
        public usuario: Usuario,
        public professor: Professor,
        public turma: Turma,
        public endereco: string,
        public observacao: string,
        public nivelAtual: NivelEnum,
        public nivelMeta: NivelEnum,
    ) { }
}