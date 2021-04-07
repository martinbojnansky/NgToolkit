
export interface SampleSummary {
  id: number;
  name: string;
}

export interface SampleDetail extends SampleSummary {
  description: string;
}
