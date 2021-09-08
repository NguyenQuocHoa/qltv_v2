import { notification } from "antd";
import { createProject } from "../../services/project";

const ProjectCreateModel = {
	namespace: "projectCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createProjectRequest({ payload }, { call, put }) {
			const response = yield call(createProject, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Thêm dự án mới thành công"
				});
				yield put({
					type: "createProjectSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra. "
				});
				yield put({
					type: "createProjectFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createProjectRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createProjectSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createProjectFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default ProjectCreateModel;
