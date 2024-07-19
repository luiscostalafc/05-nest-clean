import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { compare } from 'bcryptjs';

const authenticateBodySchemaSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type authenticateBodySchemaInput = z.infer<typeof authenticateBodySchemaSchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchemaSchema))
  async handle(@Body() body: authenticateBodySchemaInput) {
    const { email, password } = body;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    return {
      access_token: accessToken,
    };
  }
}
