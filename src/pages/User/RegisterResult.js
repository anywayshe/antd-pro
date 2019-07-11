import React from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        邮箱注册结果
      </Button>
    </a>
    <Link to="/">
      <Button size="large"> 返回首页</Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={<div className={styles.title}> 注册结果</div>}
    description="邮箱"
    actions={actions}
    style={{
      marginTop: 56,
    }}
  />
);

export default RegisterResult;
