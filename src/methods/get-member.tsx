import { IMember } from '../companents/modal/companents/add-member';

export const getMemberSet = (id: string[], login: string[]): IMember[] => {
  return id.map((e, i) => {
    return { id: e, login: login[i] };
  });
};
