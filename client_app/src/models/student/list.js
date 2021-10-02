import { notification } from "antd";
import { getStudentPaging, getAllStudent } from "../../services/student";

const AllStudentModel = {
	namespace: "studentList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allStudents: [],
		allStudentSuccess: false,
		allStudentFailure: false
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
		},
		*getStudentPagingRequest({ payload }, { call, put }) {
			const response = yield call(getStudentPaging, payload);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getStudentPagingFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getStudentPagingSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllStudentRequest(state, action) {
			return {
				...state,
				allStudentSuccess: false,
				allStudentFailure: false
			};
		},
		getAllStudentSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				allStudentSuccess: true,
				allStudentFailure: false
			};
		},
		getAllStudentFailure(state, action) {
			return {
				...state,
				allStudentSuccess: false,
				allStudentFailure: true
			};
		},

		getStudentPagingRequest(state, action) {
			return {
				...state,
				payload: [],
				success: false,
				failure: false
			};
		},
		getStudentPagingSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getStudentPagingFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default AllStudentModel;
