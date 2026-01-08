import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivityLogService } from '../activity-log.service';

@Injectable()
export class ActivityLogInterceptor implements NestInterceptor {
  constructor(private readonly activityLogService: ActivityLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, path, user, ip, body } = request;

    // Ignorar requisições GET para não sobrecarregar o log (opcional)
    if (method === 'GET') return next.handle();

    return next.handle().pipe(
      tap(() => {
        const action = this.getAction(method, path);
        const module = path.split('/')[1] || 'general';

        this.activityLogService.create({
          action,
          module,
          path,
          method,
          ip,
          user: user ? { id: user.id } as any : null,
          details: JSON.stringify({
            body: this.sanitizeBody(body),
          }),
        }).catch(err => console.error('Erro ao salvar log de atividade:', err));
      }),
    );
  }

  private getAction(method: string, path: string): string {
    if (path.includes('login')) return 'Login';
    if (path.includes('register')) return 'Registro';
    
    switch (method) {
      case 'POST': return 'Criação';
      case 'PUT':
      case 'PATCH': return 'Atualização';
      case 'DELETE': return 'Exclusão';
      default: return 'Ação';
    }
  }

  private sanitizeBody(body: any): any {
    if (!body) return null;
    const sanitized = { ...body };
    const sensitiveKeys = ['password', 'token', 'access_token', 'resetToken'];
    
    sensitiveKeys.forEach(key => {
      if (key in sanitized) sanitized[key] = '********';
    });
    
    return sanitized;
  }
}
