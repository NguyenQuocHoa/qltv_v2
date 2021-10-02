import { notification } from "antd";
import { getStudentDetail } from "../../services/student";

const StudentDetailModel = {
	namespace: "studentDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getStudentDetailRequest({ id }, { call, put }) {
			const response = yield call(getStudentDetail, id);
			if (response?.code === 200) {
				yield put({
					type: "getStudentDetailSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getStudentDetailFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getStudentDetailRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		getStudentDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getStudentDetailFailure(state, action) {
			return {
				...state,
				payload: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default StudentDetailModel;
