import { Show } from "@/models";
import {
  WithFieldValue,
  DocumentData,
  Timestamp,
  QueryDocumentSnapshot,
  SnapshotOptions
} from "firebase/firestore";

const showConverter = {
  toFirestore(show: WithFieldValue<Show>): DocumentData {
    debugger
    return {
      ...show,
      date: show.date
        ? Timestamp.fromDate(new Date(show.date as string))
        : new Date(),
      creator: show.creator,
      image: show.image
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Show {
    const data = snapshot.data(options)!;
    return new Show(snapshot.id, data.title, data.date.toDate(), data.creator, data.image);
  }
};
export { showConverter };
