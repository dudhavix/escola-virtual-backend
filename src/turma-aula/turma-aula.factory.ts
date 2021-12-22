import { TurmaAulaCreateViewModel, TurmaAulaUpdateViewModel } from "./turma-aula.dto";
import { TurmaAulaEntity } from "./turma-aula.entity";

export const TurmaAulaFactory = (viewModel: TurmaAulaCreateViewModel | TurmaAulaUpdateViewModel): TurmaAulaEntity => {
    var { aula, turma } = viewModel;
    return new TurmaAulaEntity(turma, aula);
}