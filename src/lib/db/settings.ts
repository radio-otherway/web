import { Show } from "@/models";
import { createCollection } from "@/lib/db/index";
import { doc, query, setDoc, where } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";

interface Setting {
  value: string;
  updated: Date;
}

const settingsCollection = createCollection<Setting>("settings");

const Settings = {
  read: async (key: string): Promise<string | undefined> => {
    const value = (await getDoc(doc(settingsCollection, key))).data();
    return value?.value || undefined;
  },
  write: async (key: string, value: string) => {
    await setDoc(doc(settingsCollection, key), {
      value,
      updated: new Date()
    });
  }
};

export default Settings;
