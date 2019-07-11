import {
  get,
  post
} from '@/utils/request';

export async function login(params) {
  return post('/api/saas/zhs/background/user/login', params);
}

export async function register(params) {
  return post('/api/saas/zhs/background/user/register', params);
}

export async function getInfo() {
  return get('/api/saas/zhs/background/user/info');
}

export async function sendCode(params) {
  return post('/api/sms/send', params);
}
