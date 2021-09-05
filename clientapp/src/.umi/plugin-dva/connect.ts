// @ts-nocheck
import { IRoute } from '@umijs/core';
import { AnyAction } from 'redux';
import React from 'react';
import { EffectsCommandMap, SubscriptionAPI } from 'dva';
import { match } from 'react-router-dom';
import { Location, LocationState, History } from 'history';

export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/common/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/common/userRole';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/detail';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/customer/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/delegate/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/delegate/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/download';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/file/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/folder/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/folder/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/folder/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/folder/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/global';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/detail';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/group/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/login';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/detail';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/permissionGroup/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/detail';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/project/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/detail';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/import';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/report/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/setting';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/detail';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/staffGroup/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/currentUser';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/detail';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/user/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/create';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/delete';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/detail';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/list';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/models/userGroup/update';
export * from 'D:/HK2_2020-2021/LTCSDL/qltv_v2/clientapp/src/pages/user/register/model';

export interface Action<T = any> {
  type: T
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ImmerReducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => void;

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap,
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch<P = any, C = (payload: P) => void> = (action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export type Subscription = (api: SubscriptionAPI, done: Function) => void | Function;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    [key: string]: any;
  };
}

/**
 * @type P: Params matched in dynamic routing
 */
export interface ConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
> {
  dispatch?: Dispatch;
  // https://github.com/umijs/umi/pull/2194
  match?: match<P>;
  location: Location<S> & { query: T };
  history: History;
  route: IRoute;
}

export type RequiredConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
  > = Required<ConnectProps<P, S, T>>

/**
 * @type T: React props
 * @type U: match props types
 */
export type ConnectRC<
  T = {},
  U = {},
  S = {},
  Q = {}
> = React.ForwardRefRenderFunction<any, T & RequiredConnectProps<U, S, Q>>;

