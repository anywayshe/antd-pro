import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import classNames from 'classnames';
import Link from 'umi/link';
import styles from './index.less';
import { title } from '../../defaultSettings';
import Routes from '../../../config/router.config';

const { Sider } = Layout;
const { SubMenu } = Menu;

let firstMount = true;

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    firstMount = false;
  }

  render() {
    const { logo, collapsed, onCollapse, fixSiderbar, theme, isMobile } = this.props;

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1> {title}</h1>
          </Link>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {Routes[1].routes.map(route => {
            if (route.routes) {
              const { name, icon } = route;
              return (
                <SubMenu
                  key={name}
                  title={
                    <span>
                      <Icon type={icon} />
                      <span>{name}</span>
                    </span>
                  }
                >
                  {route.routes.map(item => {
                    return (
                      <Menu.Item key={item.name}>
                        <Link to={item.path}>{item.name}</Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            }
          })}
        </Menu>
      </Sider>
    );
  }
}
