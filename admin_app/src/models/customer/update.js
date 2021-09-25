import { notification } from "antd";
import { updateCustomer } from "../../services/customer";

const CustomerUpdateModel = {
	namespace: "customerUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateCustomerRequest({ payload }, { call, put }) {
			const response = yield call(updateCustomer, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật thông tin khách hàng thành công!"
				});
				yield put({
					type: "updateCustomerSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra. " + response?.message
				});
				yield put({
					type: "updateCustomerFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateCustomerRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		updateCustomerSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateCustomerFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default CustomerUpdateModel;
