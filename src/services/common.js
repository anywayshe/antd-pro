import { post } from '@/utils/request';

export default {};

export function uploadFile(params) {
  return post('/api/saas/oss/files', params);
}
