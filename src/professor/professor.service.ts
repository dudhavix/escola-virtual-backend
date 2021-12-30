import { Inject, Injectable, Logger } from "@nestjs/common";
import { ProfessorRepository } from "./professor.repository";

@Injectable()
export class ProfessorService {

    private logger = new Logger(ProfessorService.name);

    constructor(
        @Inject("ProfessorRepository") private readonly repository: ProfessorRepository,
    ) { }
    
}