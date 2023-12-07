export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './user/Register/register.tsx',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '用户信息',
    path: '/userinfo',
    component: './Userinfo/userinfo.tsx'
  },
  {
    name: '设备总览',
    path: '/summary_charts',
    component:'./Device/Totalcharts/totalcharts.tsx',
  },
  {
    path: '/device',
    name: '设备管理',
    routes: [
      {
        name: '配置信息',
        path: '/device/config',
        component:'./Device/Deviceconfig/deviceconfig.tsx',
      },
      {
        name: '消息查询',
        path: '/device/info',
        component:'./Device/Deviceinfo/deviceinfo.tsx',
      },
      {
        name: '历史轨迹',
        path: '/device/history',
        component:'./Device/HistoryType/historytype.tsx',
      },
    ],
  },
  {
    path: '/welcome',
    name: '主页',
    icon: '',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
