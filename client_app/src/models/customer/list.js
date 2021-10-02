import { notification } from "antd";
import { getAllCustomerList, getCustomerList } from "../../services/customer";

const CustomerListModel = {
	namespace: "customerList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allCustomers: [],
		allCustomerSuccess: false,
		allCustomerFailure: false
	},
	effects: {
		*getCustomerListRequest({ payload }, { call, put }) {
			const response = yield call(getCustomerList, payload);
			if (response.status === 0) {
				yield put({
					type: "getCustomerListSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getCustomerListFailure",
					payload: response
				});
			}
		},
		*getAllCustomerListRequest(_, { call, put }) {
			const response = yield call(getAllCustomerList);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllCustomerListFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAllCustomerListSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getCustomerListRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getCustomerListSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getCustomerListFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		},

		getAllCustomerListRequest(state, action) {
			return {
				...state,
				allCustomers: [],
				allCustomerSuccess: false,
				allCustomerFailure: false
			};
		},
		getAllCustomerListSuccess(state, action) {
			return {
				...state,
				allCustomers: action.payload,
				allCustomerSuccess: true,
				allCustomerFailure: false
			};
		},
		getAllCustomerListFailure(state, action) {
			return {
				...state,
				allCustomerSuccess: false,
				allCustomerFailure: true
			};
		}
	}
};
export default CustomerListModel;
