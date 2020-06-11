import { types, Instance } from "mobx-state-tree";
import { useContext, createContext } from 'react';
import { ConflictsStore } from './conflicts';


const rootModel = types.model({
  conflicts: ConflictsStore
});

export const rootStore = rootModel.create({conflicts:{state: 'done', conflicts: []}});

export interface IRootInstance extends Instance<typeof rootModel> {};
const RootStoreContext = createContext<null | IRootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}