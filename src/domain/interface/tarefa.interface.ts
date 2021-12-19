import { Arquivo } from "./arquivo.interface";
import { Aula } from "./aula.interface";

export interface Tarefa {
    aula: Aula;
    arquivos: Array<Arquivo>;
    observacao: string;
    dataEntrega: string;
}