import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

import { ProjectSlice, createProjectSlice } from './project.slice'; 
import { FavoriteSlice, createFavoriteSlice } from './favorite.slice'; 
type StoreState = ProjectSlice & FavoriteSlice; 

export const useProjectStore = create<StoreState>()(
  devtools(
    immer((set, get, api) => ({
      ...createProjectSlice(set, get, api), 
      ...createFavoriteSlice(set, get, api),
    }))
  )
);

export default useProjectStore;