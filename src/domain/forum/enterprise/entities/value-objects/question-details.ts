import { ValueObject } from '@/core/entities/value-object';
import { Slug } from './slug';
import { Attachment } from '../attachment';

export interface QuestionDetailsProps {
  questionId: string;
  authorId: string;
  author: string;
  title: string;
  slug: Slug;
  content: string;
  bestAnswerId?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  attachments: Attachment[];
}

export class QuestionDetails extends ValueObject<QuestionDetailsProps> {
  get questionId() {
    return this.props.questionId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get author() {
    return this.props.author;
  }

  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }

  get content() {
    return this.props.content;
  }

  get attachments() {
    return this.props.attachments;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: QuestionDetailsProps) {
    return new QuestionDetails(props);
  }
}
