import { Injectable, Res, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { GoogleSignInDTO } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(email: string, @Res() res) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) throw new UnauthorizedException('Usuário não encontrado')

    const accessToken = await this.signToken(user.id, user.email, user.roles)

    return res.json({ user, accessToken })
  }

  async validateGoogleUser(dto: GoogleSignInDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (!user) {
      return { unauthorized: true, email: dto.email }
    }

    if (user) {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: dto.name,
          email: dto.email,
          image: dto.image.replace('s96-c', 's384-c'),
        },
      })

      return user
    }
  }

  async signToken(userId: string, email: string, roles: string[]) {
    const payload = {
      id: userId,
      email,
      roles,
    }

    const secret = this.config.get('JWT_SECRET')

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '6h',
      secret,
    })

    return accessToken
  }
}