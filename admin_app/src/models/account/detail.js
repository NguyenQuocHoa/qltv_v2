import { notification } from "antd";
import { getAccountDetail } from "../../services/account";

const AccountDetailModel = {
	namespace: "accountDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getAccountDetailRequest({ id }, { call, put }) {
			const response = yield call(getAccountDetail, id);
			if (response?.code === 200) {
				yield put({
					type: "getAccountDetailSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAccountDetailFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAccountDetailRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		getAccountDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getAccountDetailFailure(state, action) {
			return {
				...state,
				payload: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default AccountDetailModel;
