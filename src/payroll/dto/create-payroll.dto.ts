import { Transform } from 'class-transformer';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreatePayrollDto {
  @IsString()
  sector_of_economics: string;

  @IsString()
  position: string;

  @IsString()
  country: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  salary_in_year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(16)
  @Max(90)
  age: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  experience_in_years: number;
}
