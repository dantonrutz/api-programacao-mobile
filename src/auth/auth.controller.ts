import { Controller, Get, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleOAuthGuard } from './guard/google-oauth.guard'
import { GetUser } from './decorator'
import { User } from 'generated/prisma'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  googleCallback(@GetUser() user: User, @Res() res) {
    return this.authService.signIn(user.email, res)
  }
}