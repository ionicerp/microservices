import * as admin from 'firebase-admin';

export interface IFirestoreQuery {
  collection?: string;
  filter?: Array<IFirestoreQueryFilter>;
  order?: Array<IFirestoreQueryOrder>;
  limit?: number;
  start_at?: any;
  start_after?: any;
  end_at?: any;
  end_before?: any;
}

export interface IFirestoreQueryFilter {
  field: string;
  operator: admin.firestore.WhereFilterOp;
  value: string;
}

export interface IFirestoreQueryOrder {
  field: string;
  direction: string;
}
