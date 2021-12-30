import { NivelEnum } from "../enum/nivel.enum";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { Usuario } from "../usuario/usuario.interface";

export interface Aluno {
    usuario: Usuario;
    professor: Professor;
    turma: Turma;
    endereco: string;
    observacao: string;
    nivelAtual: NivelEnum;
    nivelMeta: NivelEnum;
}