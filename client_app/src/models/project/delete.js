import { notification } from "antd";
import { deleteProject } from "../../services/project";

const ProjectDeleteModel = {
	namespace: "projectDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteProjectRequest({ id }, { call, put }) {
			const response = yield call(deleteProject, id);
			const { message } = response;
			if (response?.code === 200) {
				notification.success({
					message: "Đã xóa dự án"
				});
				yield put({
					type: "deleteProjectSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "deleteProjectFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteProjectRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteProjectSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteProjectFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default ProjectDeleteModel;
