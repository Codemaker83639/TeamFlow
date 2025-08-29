import { Controller, Post, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

// 1. Anidamos todas las rutas de este controlador bajo la ruta de una tarea específica
@Controller('tasks/:taskId/timer')
@UseGuards(JwtAuthGuard) // 2. Protegemos todos los endpoints
export class TimeTrackingController {
  constructor(private readonly timeTrackingService: TimeTrackingService) { }

  /**
   * Endpoint para iniciar el cronómetro de una tarea.
   */
  @Post('start') // La ruta final será: POST /tasks/:taskId/timer/start
  startTimer(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @GetUser() user: User, // 3. Obtenemos el usuario que está iniciando el cronómetro
  ) {
    return this.timeTrackingService.startTimer(taskId, user.id);
  }

  /**
   * Endpoint para detener el cronómetro de una tarea.
   */
  @Post('stop') // La ruta final será: POST /tasks/:taskId/timer/stop
  stopTimer(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @GetUser() user: User, // 4. Obtenemos el usuario que está deteniendo el cronómetro
  ) {
    return this.timeTrackingService.stopTimer(taskId, user.id);
  }
}