import React from 'react';
import Link from 'umi/link';
import Exception from '@/components/Exception';

export default () => <Exception type="404" linkElement={Link} desc="页面404" backText="返回首页" />;
