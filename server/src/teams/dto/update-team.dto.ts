// En: server/src/teams/dto/update-team.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';

// PartialType toma todas las validaciones de CreateTeamDto y las hace opcionales.
export class UpdateTeamDto extends PartialType(CreateTeamDto) { }