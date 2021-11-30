import axios from 'axios';
import { baseURL } from '@/constants';

axios.defaults.headers.common = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
axios.defaults.baseURL = baseURL;