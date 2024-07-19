import { PaginationParams } from '@/core/interfaces/pagination-params';
import { Answer } from '../../enterprise/entities/answer';

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(
    answerId: string,
    params: PaginationParams,
  ): Promise<Answer[]>;
  create(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
