import { notification } from "antd";
import { createAccount } from "../../services/account";

const AccountCreateModel = {
	namespace: "accountCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createAccountRequest({ payload }, { call, put }) {
			const response = yield call(createAccount, payload);
			if (response?.code === 201) {
				notification.success({
					message: "Thêm tài khoản mới thành công"
				});
				yield put({
					type: "createAccountSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "createAccountFailure",
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
		createAccountRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createAccountSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createAccountFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
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
export default AccountCreateModel;
