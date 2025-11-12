import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { GoogleSignInDTO, CredentialsSignInDTO, CredentialsSignUpDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  // Login com email e senha
  async credentialsSignIn(dto: CredentialsSignInDTO) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Senha incorreta');

    const accessToken = await this.signToken(user.id, user.email, user.roles || []);

    return { user, accessToken };
  }

  async validateGoogleUser(dto: GoogleSignInDTO) {
    const googleRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=`
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
          password: '',
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

  // Login com Google
  async signIn(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const accessToken = await this.signToken(user.id, user.email, user.roles || []);

    return { user, accessToken };
  }

  async signToken(userId: string, email: string, roles: string[]) {
    const payload = { id: userId, email, roles };
    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      secret,
      expiresIn: '6h',
    });
  }

  async signUp(dto: CredentialsSignUpDTO) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) throw new UnauthorizedException('Escolha outro e-mail');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        image: '',
        password: hashedPassword,
        roles: [RoleEnum.STUDENT],
      },
    });

    const accessToken = await this.signToken(user.id, user.email, user.roles || []);

    return { user, accessToken };
  }
}