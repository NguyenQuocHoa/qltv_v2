import { notification } from "antd";
import { getAllListUser, getListUser } from "../../services/user";
const UserListModel = {
	namespace: "userList",
	state: {
		allUserResponse: [],
		userResponse: [],
		success: false,
		failure: false
	},
	effects: {
		*getAllListUserRequest(_, { call, put }) {
			const response = yield call(getAllListUser);
			const { message } = response;
			if (response.status === 400) {
				notification.error({
					message: message
				});
				yield put({
					type: "getAllListUserFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAllListUserSuccess",
					payload: response
				});
			}
		},

		*getListUserRequest({ payload }, { call, put }) {
			const response = yield call(getListUser, payload);
			const { message } = response;
			if (response.status === 400) {
				notification.error({
					message: message
				});
				yield put({
					type: "getListUserFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getListUserSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllListUserRequest(state, action) {
			return {
				...state,
				allUserResponse: [],
				success: false,
				failure: false
			};
		},
		getAllListUserSuccess(state, action) {
			return {
				...state,
				allUserResponse: action.payload,
				success: true,
				failure: false
			};
		},
		getAllListUserFailure(state, action) {
			return {
				...state,
				allUserResponse: action.payload,
				success: false,
				failure: true
			};
		},

		getListUserRequest(state, action) {
			return {
				...state,
				userResponse: [],
				success: false,
				failure: false
			};
		},
		getListUserSuccess(state, action) {
			return {
				...state,
				userResponse: action.payload,
				success: true,
				failure: false
			};
		},
		getListUserFailure(state, action) {
			return {
				...state,
				userResponse: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default UserListModel;
