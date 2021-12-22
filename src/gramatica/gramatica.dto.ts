import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { NivelEnum } from "../enum/nivel.enum";
import { Professor } from "../professor/professor.interface";

export class GramaticaCreateViewModel {
    @IsNotEmpty()
    professor: Professor;

    @IsString()
    @IsNotEmpty()
    sentenca1: string;

    @IsString()
    @IsNotEmpty()
    sentenca2: string;

    @IsString()
    sentenca3: string;

    @IsString()
    @IsNotEmpty()
    nivel: NivelEnum;
}

export class GramaticaUpdateViewModel {
    readonly _id: string;
    readonly professor: Professor;

    @IsString()
    @IsOptional()
    sentenca1: string;

    @IsString()
    @IsOptional()
    sentenca2: string;

    @IsString()
    @IsOptional()
    sentenca3: string;

    @IsString()
    @IsOptional()
    nivel: NivelEnum;
}