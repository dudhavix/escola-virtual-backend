import { NivelEnum } from "../enum/nivel.enum";
import { AlunoEntity } from "./aluno.entity";
import { Aluno } from "./aluno.interface";

export const AlunoFactory = (viewModel: Aluno): AlunoEntity => {
    var { usuario, professor, turma, endereco, observacao, nivelAtual, nivelMeta  } = viewModel;

    nivelAtual = NivelEnum[nivelAtual];
    nivelMeta = NivelEnum[nivelMeta];

    return new AlunoEntity(usuario, professor, turma, endereco, observacao, nivelAtual, nivelMeta);
}