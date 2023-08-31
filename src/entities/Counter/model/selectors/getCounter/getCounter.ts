import { StateSchema } from '@/app-fsd/providers/StoreProvider';

export const getCounter = (state: StateSchema) => state.counter;
