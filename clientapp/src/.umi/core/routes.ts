// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/user/login",
            "name": "login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/User/login'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/layouts/BasicLayout'), loading: LoadingComponent}),
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/",
            "redirect": "/latest-reports",
            "exact": true
          },
          {
            "name": "latestReport",
            "path": "/latest-reports",
            "icon": "BarChartOutlined",
            "routes": [
              {
                "path": "/latest-reports",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__latestReport' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/latestReport'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "report",
            "path": "/report",
            "icon": "AreaChartOutlined",
            "routes": [
              {
                "path": "/report",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__report' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/report'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/report/create",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__report__reportForm' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/report/reportForm'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/report/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__report__reportForm' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/report/reportForm'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "project",
            "path": "/projects",
            "icon": "FundProjectionScreenOutlined",
            "routes": [
              {
                "path": "/projects",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/project'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/projects/create",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__create' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/project/create'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/projects/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__update' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/project/update'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "backlog",
            "path": "/backlogs",
            "icon": "UnorderedListOutlined",
            "routes": [
              {
                "path": "/backlogs/create",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__backlog__create' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/backlog/create'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/backlogs/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__backlog' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/backlog'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "customer",
            "path": "/customers",
            "icon": "SmileOutlined",
            "routes": [
              {
                "path": "/customers",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__customer' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/customer'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/customers/create",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__customer__create' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/customer/create'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/customers/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__customer__update' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/customer/update'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "users",
            "path": "/users",
            "icon": "UserAddOutlined",
            "routes": [
              {
                "path": "/users",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/user'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/users/create",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__userForm' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/user/userForm'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/users/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__userForm' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/user/userForm'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "staffGroup",
            "path": "/staffGroups",
            "icon": "UsergroupAddOutlined",
            "routes": [
              {
                "path": "/staffGroups",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__staffGroup' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/staffGroup'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/staffGroups/create",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__staffGroup__create' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/staffGroup/create'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/staffGroups/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__staffGroup__update' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/staffGroup/update'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "permissionGroup",
            "path": "/pgs",
            "icon": "GroupOutlined",
            "routes": [
              {
                "path": "/pgs",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__permissionGroup' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/permissionGroup'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/pgs/create",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__permissionGroup__create' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/permissionGroup/create'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/pgs/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__permissionGroup__update' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/permissionGroup/update'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "delegate",
            "path": "/delegates",
            "icon": "UsergroupAddOutlined",
            "routes": [
              {
                "path": "/delegates",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__delegate' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/delegate'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "file",
            "path": "/folders",
            "icon": "FileOutlined",
            "routes": [
              {
                "path": "/folders",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__file' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/file'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/folders/:id/create",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__file__create' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/file/create'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/folders/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__file__list' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/file/list'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
