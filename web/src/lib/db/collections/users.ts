import { Profile } from "@/models";
import { doc, setDoc } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";
import { createCollection } from "..";

const Users = {
  collection: createCollection<Profile>("users"),

  get: async (id: string) => {
    const result = await getDoc(doc(Users.collection, id));
    return result.data();
  },
  set: async (id: string, user: Profile) => {
    await setDoc(doc(Users.collection, id), user, {
      merge: true,
    });
  },
};

export default Users;
