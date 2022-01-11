import { FrequenciaEnum } from "../enum/frequencia.enum";
import { TagEnum } from "../enum/tag.enum";
import { Professor } from "../professor/professor.interface";

export interface Turma {
    nome: string;
    frequencia: FrequenciaEnum;
    observacao: string;
    professor?: Professor;
    tag?: TagEnum;
    _id?: string;
}