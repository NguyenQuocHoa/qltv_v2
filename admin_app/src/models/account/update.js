import { notification } from "antd";
import { updateAccount, resetPassword } from "../../services/account";

const AccountUpdateModel = {
	namespace: "accountUpdate",
	state: {
		payload: {},
		success: false,
		failure: false,

		resetPasswordPayload: {},
		resetPasswordSuccess: false,
		resetPasswordFailure: false
	},
	effects: {
		*updateAccountRequest({ payload }, { call, put }) {
			const response = yield call(updateAccount, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật tài khoản thành công"
				});
				yield put({
					type: "updateAccountSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "updateAccountFailure",
					payload: response
				});
			}
		},
		*resetPasswordRequest({ id }, { call, put }) {
			const response = yield call(resetPassword, id);
			if (response?.code === 200) {
				notification.success({
					message: "Đặt lại mật khẩu thành công"
				});
				yield put({
					type: "resetPasswordSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "resetPasswordFailure",
					payload: response
				});
			}
		},
		*clearState(_, { put }) {
			yield put({
				type: "clearStateSuccess"
			});
		}
	},
	reducers: {
		updateAccountRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		updateAccountSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateAccountFailure(state, action) {
			return {
				...state,
				payload: action.payload,
				success: false,
				failure: true
			};
		},
		resetPasswordRequest(state, action) {
			return {
				...state,
				resetPasswordPayload: {},
				resetPasswordSuccess: false,
				resetPasswordFailure: false
			};
		},
		resetPasswordSuccess(state, action) {
			return {
				...state,
				resetPasswordPayload: action.payload,
				resetPasswordSuccess: true,
				resetPasswordFailure: false
			};
		},
		resetPasswordFailure(state, action) {
			return {
				...state,
				resetPasswordPayload: action.payload,
				resetPasswordSuccess: false,
				resetPasswordFailure: true
			};
		},
		clearStateSuccess(state) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		}
	}
};
export default AccountUpdateModel;
