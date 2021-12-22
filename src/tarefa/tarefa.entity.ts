import { Arquivo } from "../arquivo/arquivo.interface";
import { Aula } from "../aula/aula.interface";

export class TarefaEntity {
    constructor(
        public aula: Aula,
        public arquivos: Array<Arquivo>,
        public observacao: string,
        public dataEntrega: string
    ) { }
}