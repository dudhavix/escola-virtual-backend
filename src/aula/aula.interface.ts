import { Arquivo } from "../arquivo/arquivo.interface";
import { Professor } from "../professor/professor.interface";

export interface Aula {
    professor: Professor;
    temaAula: string;
    observacao: string;
    arquivos: Array<Arquivo>
}