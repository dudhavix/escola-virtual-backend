import { AulaCreateViewModel, AulaUpdateViewModel } from "./aula.dto";
import { AulaEntity } from "./aula.entity";

export const AulaFactory = (viewModel: AulaCreateViewModel | AulaUpdateViewModel): AulaEntity => {
    var { arquivos, professor, observacao, temaAula } = viewModel;
    return new AulaEntity(professor, temaAula, observacao, arquivos);
}