import { Aula } from "../aula/aula.interface";
import { Turma } from "../turma/turma.interface";

export class TurmaAulaEntity {
    constructor(
        public turma: Turma,
        public aula: Aula
    ) { }
}