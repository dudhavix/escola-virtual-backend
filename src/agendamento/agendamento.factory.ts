import { StatusEnum } from "../enum/status.enum";
import { Professor } from "../professor/professor.interface";
import { AgendamentoCreateViewModel, AgendamentoUpdateViewModel } from "./agendamento.dto";
import { AgendamentoCreateEntity, AgendamentoUpdateEntity } from "./agendamento.entity";

export const AgendamentoCreateFactory = (viewModel: AgendamentoCreateViewModel, professor: Professor): AgendamentoCreateEntity => {
    var { dataHora, turma } = viewModel;
    const status = StatusEnum.pendente;
    return new AgendamentoCreateEntity(professor, turma, dataHora, status);
}

export const AgendamentoRemarcarFactory = (viewModel: AgendamentoUpdateViewModel): AgendamentoUpdateEntity => {
    var { dataHora, _id} = viewModel;
    return new AgendamentoUpdateEntity(dataHora, _id);
}