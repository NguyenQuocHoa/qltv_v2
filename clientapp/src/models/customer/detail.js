import { notification } from "antd";
import { getCustomerDetail } from "../../services/customer";

const CustomerDetailModel = {
	namespace: "customerDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getCustomerDetailRequest({ id }, { call, put }) {
			const response = yield call(getCustomerDetail, id);
			const { message } = response;
			if (response?.status === 400) {
				notification.error({
					message: message
				});
				yield put({
					type: "getCustomerDetailFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getCustomerDetailSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getCustomerDetailRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getCustomerDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getCustomerDetailFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default CustomerDetailModel;
