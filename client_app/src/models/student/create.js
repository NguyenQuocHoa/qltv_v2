import { notification } from "antd";
import { createStudent } from "../../services/student";

const StudentCreateModel = {
	namespace: "studentCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createStudentRequest({ payload }, { call, put }) {
			const response = yield call(createStudent, payload);
			if (response?.code === 201) {
				notification.success({
					message: "Thêm sinh viên mới thành công"
				});
				yield put({
					type: "createStudentSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "createStudentFailure",
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
		createStudentRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createStudentSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createStudentFailure(state, action) {
			return {
				...state,
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
export default StudentCreateModel;
