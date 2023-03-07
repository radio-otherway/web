import { firestore } from "../firebase";
import { collection, CollectionReference, DocumentData } from "firebase/firestore";

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};
export { createCollection };
