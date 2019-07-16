import { post } from '@/utils/request';

export default function uploadFile(params) {
  return post('/api/saas/oss/files', params);
}
