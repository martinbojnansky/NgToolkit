import { UuidObject } from 'src/app/helpers';

export interface TodoSummary extends UuidObject {
    title: string;
    completed: boolean;
}

export interface TodoDetail extends TodoSummary {
    description: string;
    createdAt: Date;
}
