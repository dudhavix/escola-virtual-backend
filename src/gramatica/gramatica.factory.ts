import { NivelEnum } from "../enum/nivel.enum";
import { GramaticaCreateViewModel, GramaticaUpdateViewModel } from "./gramatica.dto";
import { GramaticaEntity } from "./gramatica.entity";

export const GramaticaFactory = (viewModel: GramaticaCreateViewModel | GramaticaUpdateViewModel): GramaticaEntity => {
    var { nivel, professor, sentenca1, sentenca2, sentenca3 } = viewModel;
    nivel = NivelEnum[nivel];
    return new GramaticaEntity(professor, sentenca1, sentenca2, sentenca3, nivel);
}