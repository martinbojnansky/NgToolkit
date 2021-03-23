export interface CrudId {
  id: number;
}

export interface CrudSummary extends CrudId {
  name: string;
}

export interface CrudDetail extends CrudSummary {
  description: string;
}
