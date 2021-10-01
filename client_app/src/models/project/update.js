import { notification } from "antd";
import { updateProject } from "../../services/project";

const ProjectUpdateModel = {
	namespace: "projectUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateProjectRequest({ payload }, { call, put }) {
			const response = yield call(updateProject, payload);
			if (response?.code === 200) {
				notification.success({
					message: "Cập nhật thông tin dự án thành công!"
				});
				yield put({
					type: "updateProjectSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra. " + response?.message
				});
				yield put({
					type: "updateProjectFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateProjectRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		updateProjectSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateProjectFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default ProjectUpdateModel;
