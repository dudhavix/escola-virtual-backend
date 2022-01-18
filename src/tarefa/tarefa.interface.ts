import { Arquivo } from "../arquivo/arquivo.interface";
import { Aula } from "../aula/aula.interface";

export interface Tarefa {
    aula?: Aula;
    arquivos?: Array<Arquivo>;
    observacao?: string;
    dataEntrega?: string;
    _id?: string;
}