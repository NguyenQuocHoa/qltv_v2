import { notification } from "antd";
import { deleteCustomer } from "../../services/customer";

const CustomerDeleteModel = {
	namespace: "customerDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteCustomerRequest({ id }, { call, put }) {
			const response = yield call(deleteCustomer, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa khách hàng"
				});
				yield put({
					type: "deleteCustomerSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteCustomerFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteCustomerRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteCustomerSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteCustomerFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default CustomerDeleteModel;
