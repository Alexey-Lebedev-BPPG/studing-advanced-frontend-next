import { StateSchema } from '@/app-fsd/providers/StoreProvider';

export const getUserAuthData = (state: StateSchema) => state.user.authData;
