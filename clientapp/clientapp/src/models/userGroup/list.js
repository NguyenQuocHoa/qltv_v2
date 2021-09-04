import { notification } from "antd";
import {
	getAllListUserGroup,
	getListUserGroup
} from "../../services/userGroup.js";
const UserGroupListModel = {
	namespace: "userGroupList",
	state: {
		allUserGroupResponse: [],
		getAllSuccess: false,
		getAllFailure: false,

		userGroupGroupResponse: [],
		getListSuccess: false,
		getListFailure: false
	},
	effects: {
		*getAllListUserGroupRequest(_, { call, put }) {
			const response = yield call(getAllListUserGroup);
			const { message } = response;
			if (response.status === 400) {
				notification.error({
					message: message
				});
				yield put({
					type: "getAllListUserGroupFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAllListUserGroupSuccess",
					payload: response
				});
			}
		},

		*getListUserGroupRequest({ payload }, { call, put }) {
			const response = yield call(getListUserGroup, payload);
			const { message } = response;
			if (response.status === 400) {
				notification.error({
					message: message
				});
				yield put({
					type: "getListUserGroupFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getListUserGroupSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllListUserGroupRequest(state, action) {
			return {
				...state,
				allUserGroupResponse: [],
				getAllSuccess: false,
				getAllFailure: false
			};
		},
		getAllListUserGroupSuccess(state, action) {
			return {
				...state,
				allUserGroupResponse: action.payload,
				getAllSuccess: true,
				getAllFailure: false
			};
		},
		getAllListUserGroupFailure(state, action) {
			return {
				...state,
				allUserGroupResponse: action.payload,
				getAllSuccess: false,
				getAllFailure: true
			};
		},

		getListUserGroupRequest(state, action) {
			return {
				...state,
				userGroupGroupResponse: [],
				getListSuccess: false,
				getListFailure: false
			};
		},
		getListUserGroupSuccess(state, action) {
			return {
				...state,
				userGroupGroupResponse: action.payload,
				getListSuccess: true,
				getListFailure: false
			};
		},
		getListUserGroupFailure(state, action) {
			return {
				...state,
				userGroupGroupResponse: action.payload,
				getListSuccess: false,
				getListFailure: true
			};
		}
	}
};
export default UserGroupListModel;
