import { useContext } from 'react';

import { StoreContext } from './store-provider';
import { TaskList } from './TaskList';

export const useStore = (): TaskList => useContext(StoreContext);
