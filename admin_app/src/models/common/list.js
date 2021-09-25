import { notification } from "antd";
import {
	getAllListUser,
	getAllListPermissionGroup,
	getAllUserRoleById
} from "../../services/common";

const CommonModel = {
	namespace: "Common",
	state: {
		payload: [],
		success: false,
		failure: false,

		allUsers: [],
		allUserSuccess: false,
		allUserFailure: false,

		allPermissionGroups: [],
		allPermissionGroupSuccess: false,
		allPermissionGroupFailure: false,

		allUserRoles: [],
		allUserRoleSuccess: false,
		allUserRoleFailure: false
	},
	effects: {
		*getAllUserListRequest(_, { call, put }) {
			const response = yield call(getAllListUser);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllUserListFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAllUserListSuccess",
					payload: response
				});
			}
		},
		*getAllPermissionGroupListRequest(_, { call, put }) {
			const response = yield call(getAllListPermissionGroup);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllPermissionGroupListFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAllPermissionGroupListSuccess",
					payload: response
				});
			}
		},
		*getUserRoleByIdRequest({ id }, { call, put }) {
			// const response = yield call(getAllUserRoleById, id);
			const response = {
				code: 200
			};
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getUserRoleByIdFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getUserRoleByIdSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllUserListRequest(state, action) {
			return {
				...state,
				allUsers: [],
				allUserSuccess: false,
				allUserFailure: false
			};
		},
		getAllUserListSuccess(state, action) {
			return {
				...state,
				allUsers: action.payload,
				allUserSuccess: true,
				allUserFailure: false
			};
		},
		getAllUserListFailure(state, action) {
			return {
				...state,
				allUserSuccess: false,
				allUserFailure: true
			};
		},

		getAllPermissionGroupListRequest(state, action) {
			return {
				...state,
				allPermissionGroups: [],
				allPermissionGroupSuccess: false,
				allPermissionGroupFailure: false
			};
		},
		getAllPermissionGroupListSuccess(state, action) {
			return {
				...state,
				allPermissionGroups: action.payload,
				allPermissionGroupSuccess: true,
				allPermissionGroupFailure: false
			};
		},
		getAllPermissionGroupListFailure(state, action) {
			return {
				...state,
				allPermissionGroupSuccess: false,
				allPermissionGroupFailure: true
			};
		},

		getUserRoleByIdRequest(state, action) {
			return {
				...state,
				allUserRoles: [],
				allUserRoleSuccess: false,
				allUserRoleFailure: false
			};
		},
		getUserRoleByIdSuccess(state, action) {
			return {
				...state,
				allUserRoles: action.payload,
				allUserRoleSuccess: true,
				allUserRoleFailure: false
			};
		},
		getUserRoleByIdFailure(state, action) {
			return {
				...state,
				allUserRoleSuccess: false,
				allUserRoleFailure: true
			};
		}
	}
};
export default CommonModel;
