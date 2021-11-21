import { Aluno } from "./aluno.inteface";
import { Pauta } from "./pauta.interface";
import { Turma } from "./turma.inteface";

export interface AlunoInformacoes {
    aluno: Aluno,
    turma: Turma,
    pauta: Array<Pauta>,
}