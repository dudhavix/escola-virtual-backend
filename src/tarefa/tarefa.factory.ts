import { TarefaCreateViewModel, TarefaUpdateViewModel } from "./tarefa.dto";
import { TarefaEntity } from "./tarefa.entity";

export const TarefaFactory = (viewModel: TarefaCreateViewModel | TarefaUpdateViewModel): TarefaEntity => {
    var { arquivos, aula, dataEntrega, observacao } = viewModel;
    return new TarefaEntity(aula, arquivos, observacao, dataEntrega);
}