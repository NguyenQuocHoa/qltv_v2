import { notification } from "antd";
import { deleteStudent } from "../../services/student";

const StudentDeleteModel = {
	namespace: "studentDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteStudentRequest({ id }, { call, put }) {
			const response = yield call(deleteStudent, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa sinh viên"
				});
				yield put({
					type: "deleteStudentSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteStudentFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteStudentRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteStudentSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteStudentFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default StudentDeleteModel;
