import { notification } from "antd";
import { getProjectDetail } from "../../services/project";

const ProjectDetailModel = {
	namespace: "projectDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getProjectDetailRequest({ id }, { call, put }) {
			const response = yield call(getProjectDetail, id);
			const { message } = response;
			if (response?.status === 400) {
				notification.error({
					message: message
				});
				yield put({
					type: "getProjectDetailFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getProjectDetailSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getProjectDetailRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getProjectDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getProjectDetailFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default ProjectDetailModel;
