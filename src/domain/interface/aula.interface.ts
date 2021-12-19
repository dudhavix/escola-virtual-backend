import { Arquivo } from "./arquivo.interface";
import { Professor } from "./professor.interface";

export interface Aula {
    professor: Professor;
    temaAula: string;
    observacao: string;
    arquivos: Array<Arquivo>
}