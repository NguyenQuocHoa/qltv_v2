import { notification } from "antd";
import { updateStudent } from "../../services/student";

const StudentUpdateModel = {
	namespace: "studentUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateStudentRequest({ payload }, { call, put }) {
			const response = yield call(updateStudent, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật sinh viên thành công"
				});
				yield put({
					type: "updateStudentSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "updateStudentFailure",
					payload: response
				});
			}
		},
		*clearState(_, { put }) {
			yield put({
				type: "clearStateSuccess"
			});
		}
	},
	reducers: {
		updateStudentRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		updateStudentSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateStudentFailure(state, action) {
			return {
				...state,
				payload: action.payload,
				success: false,
				failure: true
			};
		},
		clearStateSuccess(state) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		}
	}
};
export default StudentUpdateModel;
