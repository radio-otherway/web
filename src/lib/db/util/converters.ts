import { Show } from "@/models";
import {
  WithFieldValue,
  DocumentData,
  Timestamp,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

const showConverter = {
  toFirestore(show: WithFieldValue<Show>): DocumentData {
    return {
      ...show,
      date: show.date
        ? Timestamp.fromDate(new Date(show.date as string))
        : new Date(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Show {
    const data = snapshot.data(options)!;
    return new Show(snapshot.id, data.title, data.date.toDate(), data.creator);
  },
};
export { showConverter };
