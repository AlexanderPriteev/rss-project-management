import { IMember } from '../companents/modal/companents/add-member';

export const getMemberSet = (id: string[], login: string[]): IMember[] => {
  const set = id.map((e, i) => {
    return { id: e, login: login[i] };
  });
  return set.sort((a, b) => a.login.localeCompare(b.login));
};
