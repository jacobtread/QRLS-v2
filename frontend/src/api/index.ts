import axios from 'axios';
import { BASE_URL } from '@/constants';
import { getSettings } from '@/api/admin';
import store from "@/store"

axios.defaults.headers.common = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};
axios.defaults.baseURL = BASE_URL;

async function loadSettings() {
  try {
    const { data } = await getSettings();
    store.state.mandate = data.mandate
    store.state.nvMessage = data.nvMessage
    store.state.admin = data.admin
  } catch (e) {
    console.log('Failed to load settings', e);
  }
}

setInterval(loadSettings, 5 * 60 * 1000);

loadSettings().then().catch()