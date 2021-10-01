import { notification } from "antd";
import { updateStudent, resetPassword } from "../../services/student";

const StudentUpdateModel = {
	namespace: "studentUpdate",
	state: {
		payload: {},
		success: false,
		failure: false,

		resetPasswordPayload: {},
		resetPasswordSuccess: false,
		resetPasswordFailure: false
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
		*resetPasswordRequest({ id }, { call, put }) {
			const response = yield call(resetPassword, id);
			if (response?.code === 200) {
				notification.success({
					message: "Đặt lại mật khẩu thành công"
				});
				yield put({
					type: "resetPasswordSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response?.message
				});
				yield put({
					type: "resetPasswordFailure",
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
		resetPasswordRequest(state, action) {
			return {
				...state,
				resetPasswordPayload: {},
				resetPasswordSuccess: false,
				resetPasswordFailure: false
			};
		},
		resetPasswordSuccess(state, action) {
			return {
				...state,
				resetPasswordPayload: action.payload,
				resetPasswordSuccess: true,
				resetPasswordFailure: false
			};
		},
		resetPasswordFailure(state, action) {
			return {
				...state,
				resetPasswordPayload: action.payload,
				resetPasswordSuccess: false,
				resetPasswordFailure: true
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
