import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Permission } from '../enums/permission.enum';

interface RequestWithUser {
  user?: {
    permissions?: Permission[];
  };
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true; // kein Permission-Check nötig
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { user } = request;

    if (!user?.permissions || user.permissions.length === 0) {
      throw new ForbiddenException('Keine Berechtigungen');
    }

    const hasPermission = requiredPermissions.every((p) => user.permissions!.includes(p));

    if (!hasPermission) {
      throw new ForbiddenException('Nicht erlaubt');
    }

    return true;
  }
}
