import { PartialType } from '@nestjs/swagger';
import { CreateTimeTrackingDto } from './create-time-tracking.dto';

export class UpdateTimeTrackingDto extends PartialType(CreateTimeTrackingDto) {}
