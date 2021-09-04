// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelList0 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/common/list.js';
import ModelUserRole1 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/common/userRole.js';
import ModelCreate2 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/create.js';
import ModelDelete3 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/delete.js';
import ModelDetail4 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/detail.js';
import ModelList5 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/list.js';
import ModelUpdate6 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/update.js';
import ModelList7 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/delegate/list.js';
import ModelUpdate8 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/delegate/update.js';
import ModelCreate9 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/create.js';
import ModelDelete10 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/delete.js';
import ModelDownload11 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/download.js';
import ModelList12 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/list.js';
import ModelUpdate13 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/update.js';
import ModelCreate14 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/folder/create.js';
import ModelDelete15 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/folder/delete.js';
import ModelList16 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/folder/list.js';
import ModelUpdate17 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/folder/update.js';
import ModelGlobal18 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/global.js';
import ModelCreate19 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/create.js';
import ModelDelete20 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/delete.js';
import ModelDetail21 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/detail.js';
import ModelList22 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/list.js';
import ModelUpdate23 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/update.js';
import ModelLogin24 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/login.js';
import ModelCreate25 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/create.js';
import ModelDelete26 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/delete.js';
import ModelDetail27 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/detail.js';
import ModelList28 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/list.js';
import ModelUpdate29 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/update.js';
import ModelCreate30 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/create.js';
import ModelDelete31 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/delete.js';
import ModelDetail32 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/detail.js';
import ModelList33 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/list.js';
import ModelUpdate34 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/update.js';
import ModelCreate35 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/create.js';
import ModelDelete36 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/delete.js';
import ModelDetail37 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/detail.js';
import ModelImport38 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/import.js';
import ModelList39 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/list.js';
import ModelUpdate40 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/update.js';
import ModelSetting41 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/setting.js';
import ModelCreate42 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/create.js';
import ModelDelete43 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/delete.js';
import ModelDetail44 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/detail.js';
import ModelList45 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/list.js';
import ModelUpdate46 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/update.js';
import ModelUser47 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user.js';
import ModelCreate48 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/create.js';
import ModelCurrentUser49 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/currentUser.js';
import ModelDelete50 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/delete.js';
import ModelDetail51 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/detail.js';
import ModelList52 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/list.js';
import ModelUpdate53 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/update.js';
import ModelCreate54 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/create.js';
import ModelDelete55 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/delete.js';
import ModelDetail56 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/detail.js';
import ModelList57 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/list.js';
import ModelUpdate58 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/update.js';
import ModelModel59 from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/user/register/model.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'list', ...ModelList0 });
app.model({ namespace: 'userRole', ...ModelUserRole1 });
app.model({ namespace: 'create', ...ModelCreate2 });
app.model({ namespace: 'delete', ...ModelDelete3 });
app.model({ namespace: 'detail', ...ModelDetail4 });
app.model({ namespace: 'list', ...ModelList5 });
app.model({ namespace: 'update', ...ModelUpdate6 });
app.model({ namespace: 'list', ...ModelList7 });
app.model({ namespace: 'update', ...ModelUpdate8 });
app.model({ namespace: 'create', ...ModelCreate9 });
app.model({ namespace: 'delete', ...ModelDelete10 });
app.model({ namespace: 'download', ...ModelDownload11 });
app.model({ namespace: 'list', ...ModelList12 });
app.model({ namespace: 'update', ...ModelUpdate13 });
app.model({ namespace: 'create', ...ModelCreate14 });
app.model({ namespace: 'delete', ...ModelDelete15 });
app.model({ namespace: 'list', ...ModelList16 });
app.model({ namespace: 'update', ...ModelUpdate17 });
app.model({ namespace: 'global', ...ModelGlobal18 });
app.model({ namespace: 'create', ...ModelCreate19 });
app.model({ namespace: 'delete', ...ModelDelete20 });
app.model({ namespace: 'detail', ...ModelDetail21 });
app.model({ namespace: 'list', ...ModelList22 });
app.model({ namespace: 'update', ...ModelUpdate23 });
app.model({ namespace: 'login', ...ModelLogin24 });
app.model({ namespace: 'create', ...ModelCreate25 });
app.model({ namespace: 'delete', ...ModelDelete26 });
app.model({ namespace: 'detail', ...ModelDetail27 });
app.model({ namespace: 'list', ...ModelList28 });
app.model({ namespace: 'update', ...ModelUpdate29 });
app.model({ namespace: 'create', ...ModelCreate30 });
app.model({ namespace: 'delete', ...ModelDelete31 });
app.model({ namespace: 'detail', ...ModelDetail32 });
app.model({ namespace: 'list', ...ModelList33 });
app.model({ namespace: 'update', ...ModelUpdate34 });
app.model({ namespace: 'create', ...ModelCreate35 });
app.model({ namespace: 'delete', ...ModelDelete36 });
app.model({ namespace: 'detail', ...ModelDetail37 });
app.model({ namespace: 'import', ...ModelImport38 });
app.model({ namespace: 'list', ...ModelList39 });
app.model({ namespace: 'update', ...ModelUpdate40 });
app.model({ namespace: 'setting', ...ModelSetting41 });
app.model({ namespace: 'create', ...ModelCreate42 });
app.model({ namespace: 'delete', ...ModelDelete43 });
app.model({ namespace: 'detail', ...ModelDetail44 });
app.model({ namespace: 'list', ...ModelList45 });
app.model({ namespace: 'update', ...ModelUpdate46 });
app.model({ namespace: 'user', ...ModelUser47 });
app.model({ namespace: 'create', ...ModelCreate48 });
app.model({ namespace: 'currentUser', ...ModelCurrentUser49 });
app.model({ namespace: 'delete', ...ModelDelete50 });
app.model({ namespace: 'detail', ...ModelDetail51 });
app.model({ namespace: 'list', ...ModelList52 });
app.model({ namespace: 'update', ...ModelUpdate53 });
app.model({ namespace: 'create', ...ModelCreate54 });
app.model({ namespace: 'delete', ...ModelDelete55 });
app.model({ namespace: 'detail', ...ModelDetail56 });
app.model({ namespace: 'list', ...ModelList57 });
app.model({ namespace: 'update', ...ModelUpdate58 });
app.model({ namespace: 'model', ...ModelModel59 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
