import { NotificationSchedule, Show } from "@/models";
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp, WithFieldValue } from "firebase/firestore";

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
const noticeConverter = {
  toFirestore(notice: WithFieldValue<NotificationSchedule>): DocumentData {
    return notice;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): NotificationSchedule {
    const data = snapshot.data(options)!;
    return new NotificationSchedule(
      data.scheduleTimes.map((r: any) => r.toDate())
    );
  },
};
export { showConverter, noticeConverter };
