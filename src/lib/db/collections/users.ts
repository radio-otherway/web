import { Profile } from "@/models";
import { doc, getDocs, setDoc, where } from "@firebase/firestore";
import { getDoc, query } from "firebase/firestore";
import { createCollection } from "..";
import { useCallback, useMemo } from "react";
import { auth } from "@/lib/firebase";
import { Users } from "@/lib/db/collections";

const AuthService = {
  collection: createCollection<Profile>("users"),

  get: async (id: string): Promise<Profile | null> => {
    const result = await getDoc(doc(Users.collection, id));
    const j = result.data();
    return j ? Profile.fromJson(j) : null;
  },
  getByEmail: async (email: string): Promise<Profile | undefined> => {
    const userQuery = await getDocs(
      query(Users.collection, where("email", "==", email))
    );
    if (userQuery.docs.length > 0) {
      const data = userQuery.docs[0].data();
      return Profile.fromJson(data);
    }
    return undefined;
  },
  getNotifiable: async (): Promise<Profile[] | undefined> => {
    const usersQuery = await getDocs(
      query(Users.collection, where("mobileNumber", "!=", null))
    );
    return usersQuery.docs.map((r) => Profile.fromJson(r.data()));
  },
  set: async (id: string, user: Profile) => {
    await setDoc(doc(Users.collection, id), user, {
      merge: true,
    });
  },
};

export default AuthService;
