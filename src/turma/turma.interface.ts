import { FrequenciaEnum } from "../enum/frequencia.enum";
import { TagEnum } from "../enum/tag.enum";
import { Professor } from "../professor/professor.interface";

export interface Turma {
    professor: Professor;
    tag: TagEnum;
    nome: string;
    frequencia: FrequenciaEnum;
    observacao: string;
    _id?: string;
}