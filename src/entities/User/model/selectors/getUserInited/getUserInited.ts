import { StateSchema } from '@/app-fsd/providers/StoreProvider';

export const getUserInited = (state: StateSchema) => state.user._inited;
