import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';

const authenticateBodySchemaSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchemaSchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchemaSchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      throw new Error('Wrong credentials');
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
