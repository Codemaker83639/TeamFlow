import { IsEnum, IsOptional, IsUUID } from 'class-validator';

// El enum define los únicos valores permitidos para timeRange
export enum TimeRange {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
}

export class GetReportQueryDto {
    // @IsOptional(): Le dice al validador que este campo puede no venir.
    // @IsUUID(): Le dice que si viene, DEBE ser un UUID válido.
    @IsOptional()
    @IsUUID()
    userId?: string;

    @IsOptional()
    @IsUUID()
    teamId?: string;

    // @IsEnum(TimeRange): Le dice que solo puede ser 'daily', 'weekly', o 'monthly'.
    @IsOptional()
    @IsEnum(TimeRange)
    timeRange?: TimeRange = TimeRange.WEEKLY; // Mantenemos el valor por defecto
}

