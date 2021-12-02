import axios from 'axios';
import { DateTime } from 'luxon';

export const addMemberAdmin = (name: string, dob: DateTime) => axios.post('members', {
  name,
  dob: dob.toISODate(),
});
export const getSettings = () => axios.get<Settings>('settings');
export const setSetting = (key: string, value: string|boolean) => axios.put('settings', { key, value });