import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Either, right, left } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface GetQuestionUseCaseRequest {
  slug: string;
}

type GetQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  { question: Question }
>;

export class GetQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionUseCaseRequest): Promise<GetQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({
      question,
    });
  }
}
