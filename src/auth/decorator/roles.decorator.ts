import { SetMetadata } from '@nestjs/common'
import { RoleEnum } from 'generated/prisma'

export const rolesKey = 'roles'
export const Roles = (...roles: [RoleEnum, ...RoleEnum[]]) =>
  SetMetadata(rolesKey, roles)