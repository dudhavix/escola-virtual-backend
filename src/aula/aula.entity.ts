import { Arquivo } from "../arquivo/arquivo.interface";
import { Professor } from "../professor/professor.interface";

export class AulaEntity {
    constructor(
        public professor: Professor,
        public temaAula: string,
        public observacao: string,
        public arquivos: Array<Arquivo>
    ) { }
}