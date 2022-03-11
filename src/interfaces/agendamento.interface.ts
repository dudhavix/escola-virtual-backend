import { StatusEnum } from "../helpers/index.enum";
import { Turma } from "./turma.interface";
import { Usuario } from "./usuario.interface";

export interface Agendamento {
    usuario: Usuario;
    turma: Turma;
    dataHora: string;
    status: StatusEnum;
    _id?: string;
}