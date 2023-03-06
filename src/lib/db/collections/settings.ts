import { doc, setDoc } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";
import { createCollection } from "..";

interface Setting {
  value: string;
  updated: Date;
}

const Settings = {
  collection: createCollection<Setting>("settings"),

  read: async (key: string): Promise<string | undefined> => {
    const c = createCollection<Setting>("settings");
    const value = (await getDoc(doc(c, key))).data();
    return value?.value || undefined;
  },
  write: async (key: string, value: string) => {
    await setDoc(doc(Settings.collection, key), {
      value,
      updated: new Date(),
    });
  },
};

export default Settings;
