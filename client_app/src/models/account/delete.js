import { notification } from "antd";
import { deleteAccount } from "../../services/account";

const AccountDeleteModel = {
	namespace: "accountDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteAccountRequest({ id }, { call, put }) {
			const response = yield call(deleteAccount, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa tài khoản"
				});
				yield put({
					type: "deleteAccountSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteAccountFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteAccountRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteAccountSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteAccountFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default AccountDeleteModel;
