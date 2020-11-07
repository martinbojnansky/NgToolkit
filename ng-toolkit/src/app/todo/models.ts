import { UuidObject } from '../core/models';

export interface TodoSummary extends UuidObject {
  title: string;
  completed: boolean;
}

export interface TodoDetail extends TodoSummary {
  description: string;
  createdAt: Date;
}
