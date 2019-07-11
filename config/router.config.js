export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: '登录',
        component: './User/Login'
      },
      {
        path: '/user/register',
        name: '注册',
        component: './User/Register'
      },
      {
        path: '/user/register-result',
        name: '注册结果',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // dashboard
      {
        path: '/',
        redirect: '/dashboard/index'
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'dashboard',
        routes: [{
          path: '/dashboard/index',
          name: '个人信息',
          component: './Dashboard/Index',
        }],
      },
      {
        path: '/excel',
        name: 'Excel',
        icon: 'form',
        routes: [{
            path: '/excel/list',
            name: '列表',
            component: './Excel/List',
          },
          {
            path: '/excel/add',
            name: '添加',
            component: './Excel/Add',
          }
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
