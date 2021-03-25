import { CrudDetail, CrudSummary } from '../crud/crud';

export interface SampleSummary extends CrudSummary {}

export interface SampleDetail extends CrudDetail {
  type: 'Beginner' | 'Advanced' | 'Expert';
}
