import { IFirestoreQuery } from './interfaces/query.interface';
import * as admin from 'firebase-admin';

export const buildQueryFirestore = (firestoreQuery: IFirestoreQuery) => {
  const query = admin.firestore().collection(firestoreQuery.collection!);
  if (firestoreQuery.filter && firestoreQuery.filter.length > 0) {
    firestoreQuery.filter.forEach((filter) => {
      query.where(filter.field, filter.operator, filter.value);
    });
  }
  if (firestoreQuery.order && firestoreQuery.order.length > 0) {
    firestoreQuery.order.forEach((order: any) => {
      query.orderBy(order.field, order.direction);
    });
  }
  if (firestoreQuery.limit) {
    query.limit(firestoreQuery.limit);
  }
  if (firestoreQuery.start_after) {
    query.startAfter(firestoreQuery.start_after);
  }
  if (firestoreQuery.start_at) {
    query.startAt(firestoreQuery.start_at);
  }
  if (firestoreQuery.end_before) {
    query.endBefore(firestoreQuery.end_before);
  }
  if (firestoreQuery.end_at) {
    query.endAt(firestoreQuery.end_at);
  }
  return query;
};
