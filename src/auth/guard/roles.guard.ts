import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RoleEnum, User } from 'generated/prisma'
import { rolesKey } from '../decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      rolesKey,
      [context.getHandler(), context.getClass()],
    )

    const user: User = context.switchToHttp().getRequest().user

    const hasRequiredRoles = requiredRoles.some((role) =>
      user.roles.includes(role),
    )

    return hasRequiredRoles
  }
}