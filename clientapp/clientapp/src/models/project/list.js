import { notification } from "antd";
import { getAllProjectList, getProjectList } from "../../services/project";

const ProjectListModel = {
	namespace: "projectList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allProjects: [],
		allProjectSuccess: false,
		allProjectFailure: false
	},
	effects: {
		*getProjectListRequest({ payload }, { call, put }) {
			const response = yield call(getProjectList, payload);
			if (response.status === 0) {
				yield put({
					type: "getProjectListSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getProjectListFailure",
					payload: response
				});
			}
		},
		*getAllProjectListRequest(_, { call, put }) {
			const response = yield call(getAllProjectList);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllProjectListFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAllProjectListSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getProjectListRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getProjectListSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getProjectListFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		},

		getAllProjectListRequest(state, action) {
			return {
				...state,
				allProjects: [],
				allProjectSuccess: false,
				allProjectFailure: false
			};
		},
		getAllProjectListSuccess(state, action) {
			return {
				...state,
				allProjects: action.payload,
				allProjectSuccess: true,
				allProjectFailure: false
			};
		},
		getAllProjectListFailure(state, action) {
			return {
				...state,
				allProjectSuccess: false,
				allProjectFailure: true
			};
		}
	}
};
export default ProjectListModel;
