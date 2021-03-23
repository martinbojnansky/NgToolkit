import { CrudSummary, CrudDetail } from './crud';

export interface SampleSummary extends CrudSummary {}

export interface SampleDetail extends CrudDetail {
  type: 'Beginner' | 'Advanced' | 'Expert';
}
