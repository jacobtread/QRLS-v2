import axios from 'axios';
import { BASE_URL } from '@/constants';

axios.defaults.headers.common = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
axios.defaults.baseURL = BASE_URL;