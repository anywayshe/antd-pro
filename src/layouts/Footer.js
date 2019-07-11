import React from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer
    style={{
      padding: 0,
    }}
  >
    <GlobalFooter
      links={[
        {
          key: '',
          title: <Icon type="github" />,
          href: '',
          blankTarget: false,
        },
      ]}
    />
  </Footer>
);
export default FooterView;
