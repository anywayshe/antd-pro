import {
  get,
} from '@/utils/request';

export async function visitList(params) {
  return get('/api/saas/zhs/app/visit/list/index', params);
}

export async function exportList(params) {
  return get('/api/saas/zhs/app/visit/list/index/export', params);
}
