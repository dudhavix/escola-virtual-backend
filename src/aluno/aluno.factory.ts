import { NivelEnum } from "../enum/nivel.enum";
import { Professor } from "../professor/professor.interface";
import { AlunoCreateEntity, AlunoUpdateEntity } from "./aluno.entity";
import { Aluno } from "./aluno.interface";

export const AlunoCreateFactory = (viewModel: Aluno, professor: Professor): AlunoCreateEntity => {
    var { usuario, turma, endereco, observacao, nivelAtual, nivelMeta } = viewModel;

    nivelAtual = NivelEnum[nivelAtual];
    nivelMeta = NivelEnum[nivelMeta];

    return new AlunoCreateEntity(usuario, professor, turma, endereco, observacao, nivelAtual, nivelMeta);
}

export const AlunoUpdateFactory = (viewModel: Aluno): AlunoUpdateEntity => {
    var { turma, endereco, observacao, nivelAtual, nivelMeta, _id } = viewModel;
    
    nivelAtual = NivelEnum[nivelAtual];
    nivelMeta = NivelEnum[nivelMeta];

    return new AlunoUpdateEntity(turma, endereco, observacao, nivelAtual, nivelMeta, _id);
}