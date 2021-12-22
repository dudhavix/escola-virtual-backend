import { NivelEnum } from "../enum/nivel.enum";
import { StatusEnum } from "../enum/status.enum";
import { Arquivo } from "../arquivo/arquivo.interface";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export interface Aluno {
    professor: Professor;
    turma: Turma;

    nome: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    endereco: string;
    observacao: string;
    foto: Arquivo;

    nivelAtual: NivelEnum;
    nivelMeta: NivelEnum;

    status: StatusEnum;
}