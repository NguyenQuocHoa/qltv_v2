import { notification } from "antd";
import { createCustomer } from "../../services/customer";

const CustomerCreateModel = {
	namespace: "customerCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createCustomerRequest({ payload }, { call, put }) {
			const response = yield call(createCustomer, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Thêm khách hàng mới thành công"
				});
				yield put({
					type: "createCustomerSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra. "
				});
				yield put({
					type: "createCustomerFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createCustomerRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createCustomerSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createCustomerFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default CustomerCreateModel;
