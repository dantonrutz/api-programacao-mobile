import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { GoogleSignInDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Gera JWT
  async signToken(userId: string, email: string, roles: string[]) {
    const payload = { id: userId, email, roles };
    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      secret,
      expiresIn: '6h',
    });
  }

  // Validar token do Google e criar/atualizar usuário
  async validateGoogleUser(dto: GoogleSignInDTO) {
    const googleRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${dto.access_token}`
    );
    const profile = await googleRes.json();

    if (!profile.email) {
      throw new UnauthorizedException('Google token inválido');
    }

    let user = await this.prisma.user.findUnique({ where: { email: profile.email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        },
      });
    } else {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          name: profile.name,
          image: profile.picture,
        },
      });
    }

    const accessToken = await this.signToken(user.id, user.email, user.roles || []);

    return { user, accessToken };
  }

  // Login normal (opcional)
  async signIn(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const accessToken = await this.signToken(user.id, user.email, user.roles || []);

    return { user, accessToken };
  }
}
