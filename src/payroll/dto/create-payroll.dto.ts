import { IsString, IsNumber, IsArray } from 'class-validator';

//TODO: More validations
export class CreatePayrollDto {
  @IsString()
  SectorOfEconomics: string;

  @IsString()
  position: string;

  @IsString()
  country: string;

  @IsNumber()
  salaryInYear: number;

  @IsNumber()
  age: number;

  @IsNumber()
  experienceInYears: number;

  @IsArray()
  AdditionalSkills: string[];
}
