import { NivelEnum } from "../enum/nivel.enum";
import { StatusEnum } from "../enum/status.enum";
import { AlunoCreateViewModel, AlunoUpdateViewModel } from "./aluno.dto";
import { AlunoEntity } from "./aluno.entity";

export const AlunoCreateFactory = (viewModel: AlunoCreateViewModel): AlunoEntity => {
    var { dataNascimento, turma, telefone, email, endereco, nivelAtual, nivelMeta, nome, observacao, professor, foto } = viewModel;

    var status = StatusEnum.pendente;
    
    nivelAtual = NivelEnum[nivelAtual];
    nivelMeta = NivelEnum[nivelMeta];

    return new AlunoEntity(professor, turma, nome, email, telefone, dataNascimento, endereco, observacao, foto, nivelAtual, nivelMeta, status)
}

export const AlunoUpdateFactory = (viewModel: AlunoUpdateViewModel): AlunoEntity => {
    var { dataNascimento, turma, telefone, email, endereco, nivelAtual, nivelMeta, nome, observacao, professor, foto, status } = viewModel;

    status = StatusEnum[status];

    nivelAtual = NivelEnum[nivelAtual];
    nivelMeta = NivelEnum[nivelMeta];

    return new AlunoEntity(professor, turma, nome, email, telefone, dataNascimento, endereco, observacao, foto, nivelAtual, nivelMeta, status);
}