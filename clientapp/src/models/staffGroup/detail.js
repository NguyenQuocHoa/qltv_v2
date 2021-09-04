import { notification } from "antd";
import { getStaffGroupDetail } from "../../services/staffGroup";

const StaffGroupDetailModel = {
	namespace: "staffGroupDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getStaffGroupDetailRequest({ id }, { call, put }) {
			const response = yield call(getStaffGroupDetail, id);
			const { message } = response;
			if (response?.status === 400) {
				notification.error({
					message: message
				});
				yield put({
					type: "getStaffGroupDetailFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getStaffGroupDetailSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getStaffGroupDetailRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getStaffGroupDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getStaffGroupDetailFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default StaffGroupDetailModel;
