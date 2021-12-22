import { AgendamentoCreateViewModel, AgendamentoUpdateViewModel } from "./agendamento.dto";
import { AgendamentoEntity } from "./agendamento.entity";

export const AgendamentoFactory = (viewModel: AgendamentoCreateViewModel | AgendamentoUpdateViewModel): AgendamentoEntity => {
    var { dataHora, professor, turma } = viewModel;
    return new AgendamentoEntity(professor, turma, dataHora);
}