import { Controller, Post, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('tasks/:taskId/timer')
@UseGuards(JwtAuthGuard)
export class TimeTrackingController {
  constructor(private readonly timeTrackingService: TimeTrackingService) { }

  @Post('start')
  startTimer(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @GetUser() user: User,
  ) {
    return this.timeTrackingService.startTimer(taskId, user.id);
  }

  @Post('stop')
  stopTimer(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @GetUser() user: User,
  ) {
    return this.timeTrackingService.stopTimer(taskId, user.id);
  }

  // --- 👇 NUEVO ENDPOINT PARA DESCARTAR EL TIEMPO 👇 ---
  /**
   * Endpoint para descartar (eliminar) el cronómetro activo de una tarea.
   */
  @Post('discard') // La ruta final será: POST /tasks/:taskId/timer/discard
  discardTimer(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @GetUser() user: User,
  ) {
    return this.timeTrackingService.discardTimer(taskId, user.id);
  }
}