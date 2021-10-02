import { notification } from "antd";
import { getAllStudent } from "../../services/student";

const StudentAllModel = {
	namespace: "studentAll",
	state: {
		payload: [],
		success: false,
		failure: false
	},
	effects: {
		*getAllStudentRequest({ payload }, { call, put }) {
			const response = yield call(getAllStudent, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllStudentSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllStudentFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllStudentRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getAllStudentSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getAllStudentFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default StudentAllModel;
