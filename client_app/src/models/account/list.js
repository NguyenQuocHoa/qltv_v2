import { notification } from "antd";
import { getAccountPaging, getAllAccount } from "../../services/account";

const AllAccountModel = {
	namespace: "accountList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allAccounts: [],
		allAccountSuccess: false,
		allAccountFailure: false
	},
	effects: {
		*getAllAccountRequest({ payload }, { call, put }) {
			const response = yield call(getAllAccount, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllAccountSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllAccountFailure",
					payload: response
				});
			}
		},
		*getAccountPagingRequest({ payload }, { call, put }) {
			const response = yield call(getAccountPaging, payload);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAccountPagingFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAccountPagingSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllAccountRequest(state, action) {
			return {
				...state,
				allAccountSuccess: false,
				allAccountFailure: false
			};
		},
		getAllAccountSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				allAccountSuccess: true,
				allAccountFailure: false
			};
		},
		getAllAccountFailure(state, action) {
			return {
				...state,
				allAccountSuccess: false,
				allAccountFailure: true
			};
		},

		getAccountPagingRequest(state, action) {
			return {
				...state,
				payload: [],
				success: false,
				failure: false
			};
		},
		getAccountPagingSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getAccountPagingFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default AllAccountModel;
