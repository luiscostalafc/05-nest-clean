import { PaginationParams } from '@/core/interfaces/pagination-params';
import { AnswerComment } from '../../enterprise/entities/answer-comment';

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>;
  findManyByAnswerId(
    questionId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>;
  create(answer: AnswerComment): Promise<void>;
  delete(answer: AnswerComment): Promise<void>;
}
