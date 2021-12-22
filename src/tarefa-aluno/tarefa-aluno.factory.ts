import { StatusEnum } from "../enum/status.enum";
import { TarefaAlunoCreateViewModel, TarefaAlunoUpdateViewModel } from "./tarefa-aluno.dto";
import { TarefaAlunoEntity, TarefaAlunoStatusEntity } from "./tarefa-aluno.entity";

export const TarefaAlunoFactory = (viewModel: TarefaAlunoCreateViewModel): TarefaAlunoEntity => {
    var { aluno, tarefa } = viewModel;
    var status = StatusEnum.pendente;
    return new TarefaAlunoEntity(tarefa, aluno, status)
}

export const TarefaAlunoStatusFactory = (viewModel: TarefaAlunoUpdateViewModel): TarefaAlunoStatusEntity => {
    var { status } = viewModel;
    status = StatusEnum[status];
    return new TarefaAlunoStatusEntity(status)
}