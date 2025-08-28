import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('dashboard')
@UseGuards(JwtAuthGuard) // 1. Proteger todas las rutas de este controlador
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  /**
   * Endpoint para obtener las estadísticas del dashboard para el usuario autenticado.
   */
  @Get('stats') // La ruta final será GET /dashboard/stats
  getStats(@GetUser() user: User) {
    // 2. Usamos el decorador @GetUser para obtener el usuario del token JWT
    // 3. Llamamos al servicio para que calcule las estadísticas de ese usuario
    return this.dashboardService.getStatsForUser(user);
  }
}