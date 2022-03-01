import { FrequenciaTurmaEnum, TagTurmaEnum } from "../helpers/index.enum";
import { Usuario } from "./usuario.interface";

export interface Turma {
    usuario: Usuario;
    tag: TagTurmaEnum;
    nome: string;
    frequencia: FrequenciaTurmaEnum;
    observacao: string;
    _id?: string;
}