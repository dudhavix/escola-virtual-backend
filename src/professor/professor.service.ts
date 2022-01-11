import { Inject, Injectable, Logger } from '@nestjs/common';
import { Usuario } from '../usuario/usuario.interface';
import { Professor } from './professor.interface';
import { ProfessorRepository } from './professor.repository';

@Injectable()
export class ProfessorService {
    private logger = new Logger(ProfessorService.name);

    constructor(
        @Inject("ProfessorRepository") private readonly repository: ProfessorRepository
    ) { }

    async recuperarId(usuario: Usuario): Promise<Professor> {
        const professor = await this.repository.recuperarId(usuario);
        const id = professor._id as unknown;
        return id as Professor;
    }

}