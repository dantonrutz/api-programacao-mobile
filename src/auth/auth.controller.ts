import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleSignInDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint para login via Google (React Native envia access token)
  @Post('google')
  async googleLogin(@Body() dto: GoogleSignInDTO) {
    return this.authService.validateGoogleUser(dto);
  }
}
