import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleSignInDTO, CredentialsSignInDTO, CredentialsSignUpDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // Endpoint para login via Google (React Native envia access token)
  @Post('google-login')
  async googleLogin(@Body() dto: GoogleSignInDTO) {
    return this.authService.validateGoogleUser(dto);
  }

  @Post('credentials-login')
  async credentialsSignIn(@Body() dto: CredentialsSignInDTO) {
    return this.authService.credentialsSignIn(dto);
  }

  @Post('signup')
  async signUp(@Body() dto: CredentialsSignUpDTO) {
    return this.authService.signUp(dto);
  }
}
