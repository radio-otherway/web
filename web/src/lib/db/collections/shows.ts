import { Show } from "@/models";
import { createCollection } from "..";
import { showConverter } from "../util/converters";
import { doc, getDocs, where } from "@firebase/firestore";
import { getDoc, query } from "firebase/firestore";

const Shows = {
  collection: createCollection<Show>("shows").withConverter(showConverter),
  getShowById: async (showId: string) => {
    const q = await getDoc(doc(Shows.collection, showId));
    return Show.fromJson(q.data());
  },

  getUpcomingShows: async (): Promise<Show[]> => {
    const upcomingShows = await getDocs(
      query(Shows.collection, where("date", ">", new Date()))
    );

    return upcomingShows.docs.map((s) => Show.fromJson(s.data()));
  }
};

export default Shows;
