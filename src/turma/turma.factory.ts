import { TurmaCreateViewModel } from "src/turma/turma.dto";
import { TurmaEntity } from "./turma.entity";
import { FrequenciaEnum } from "../enum/frequencia.enum";
import { TagEnum } from "../enum/tag.enum";

export const TurmaFactory = (viewModel: TurmaCreateViewModel): TurmaEntity => {
    var { professor, nome, tag,  frequencia, observacao } = viewModel;
    
    tag = TagEnum[tag];
    frequencia = FrequenciaEnum[frequencia];
    
    const entity = new TurmaEntity(professor, tag, nome, frequencia, observacao);
    return entity
}