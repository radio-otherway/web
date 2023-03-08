import { Show } from "@/models";
import { createCollection } from "..";
import { doc, getDocs, setDoc, where } from "@firebase/firestore";
import { getDoc, query } from "firebase/firestore";
import { Users } from "@/lib/db/collections/index";
import { showConverter } from "@/lib/db/util/converters";

const Shows = {
  collection: createCollection<Show>("shows").withConverter(showConverter),

  wrapShow: async (show: Show): Promise<Show> => {
    const user = await Users.getByEmail(show.creator);
    if (user && user.displayName) {
      show.creator = user.displayName;
      show.image = user.photoURL || "/img/default-show.png";
    }
    return show;
  },
  set: async (showId: string, show: Show) => {
    const showRef = doc(Shows.collection, showId);
    await setDoc(showRef, show, { merge: true });
  },
  get: async (showId: string) => {
    const q = await getDoc(doc(Shows.collection, showId));
    return Show.fromJson(q.data());
  },
  getUpcomingShows: async (): Promise<Show[]> => {
    const upcomingShows = await getDocs(
      query(Shows.collection, where("date", ">", new Date()))
    );
    return upcomingShows.docs.map((s) => {
      const show = Show.fromJson(s.data());
      return show;
    });
  },
};
export default Shows;
