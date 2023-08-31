import { StateSchema } from '@/app-fsd/providers/StoreProvider';

export const getProfileAge = (state: StateSchema) => state?.profile?.data?.age;

export const getProfileAvatar = (state: StateSchema) =>
  state?.profile?.data?.avatar;

export const getProfileCity = (state: StateSchema) =>
  state?.profile?.data?.city;

export const getProfileCountry = (state: StateSchema) =>
  state?.profile?.data?.country;

export const getProfileCurrency = (state: StateSchema) =>
  state?.profile?.data?.currency;

export const getProfileData = (state: StateSchema) => state?.profile?.data;

export const getProfileError = (state: StateSchema) => state?.profile?.error;

export const getProfileFirstName = (state: StateSchema) =>
  state?.profile?.data?.first;

export const getProfileForm = (state: StateSchema) => state?.profile?.form;

export const getProfileIsLoading = (state: StateSchema) =>
  state?.profile?.isLoading;

export const getProfileIsReadonly = (state: StateSchema) =>
  state?.profile?.readonly;

export const getProfileLastname = (state: StateSchema) =>
  state?.profile?.data?.lastname;

export const getProfileUsername = (state: StateSchema) =>
  state?.profile?.data?.username;

export const getProfileValidateErrors = (state: StateSchema) =>
  state?.profile?.validateError;
