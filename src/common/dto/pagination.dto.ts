import { IsNumber, IsOptional, IsPositive, Min,  } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    limite? : number;
    @IsOptional()
    @IsPositive()
    @IsNumber()
    pagina? : number;
}