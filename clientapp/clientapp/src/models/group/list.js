import { notification } from "antd";
import { getGroupList, getGroupListByType } from "../../services/group";
const GroupListModel = {
	namespace: "groupList",
	state: {
		groupListResponse: [],
		groupListSuccess: false,
		groupListFailure: false,

		groupListByTypeResponse: [],
		groupListByTypeSuccess: true,
		groupListByTypeFailure: false,

		jobsListResponse: [],
		jobsListSuccess: false,
		jobsListFailure: false,

		statusListResponse: [],
		statusListSuccess: false,
		statusListFailure: false
	},
	effects: {
		*getGroupListRequest({ payload }, { call, put }) {
			const response = yield call(getGroupList, payload);
			const { message } = response;
			if (response.status === 400) {
				notification.error({
					message: message
				});
				yield put({
					type: "getGroupListFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getGroupListSuccess",
					payload: response
				});
			}
		},
		*getGroupListByTypeRequest({ payload }, { call, put }) {
			const response = yield call(getGroupListByType, payload.type);
			const { message } = response;
			if (response.status === 400) {
				notification.error({
					message: message
				});
				yield put({
					type: "getGroupListByTypeFailure",
					payload: response
				});
			} else {
				switch (payload.type) {
					case 11:
						yield put({
							type: "getJobsListSuccess",
							payload: response
						});
						break;
					case 12:
						yield put({
							type: "getStatusListSuccess",
							payload: response
						});
						break;
					default:
						yield put({
							type: "getGroupListByTypeSuccess",
							payload: response
						});
						break;
				}
			}
		}
	},
	reducers: {
		getGroupListRequest(state, action) {
			return {
				...state,
				groupListResponse: [],
				groupListSuccess: false,
				groupListFailure: false
			};
		},
		getGroupListSuccess(state, action) {
			return {
				...state,
				groupListResponse: action.payload,
				groupListSuccess: true,
				groupListFailure: false
			};
		},
		getGroupListFailure(state, action) {
			return {
				...state,
				groupListResponse: action.payload,
				groupListSuccess: false,
				groupListFailure: true
			};
		},
		getGroupListByTypeRequest(state, action) {
			return {
				...state,
				groupListByTypeSuccess: false,
				groupListByTypeFailure: false
			};
		},
		getGroupListByTypeSuccess(state, action) {
			return {
				...state,
				groupListByTypeResponse: action.payload,
				groupListByTypeSuccess: true,
				groupListByTypeFailure: false
			};
		},
		getGroupListByTypeFailure(state, action) {
			return {
				...state,
				groupListByTypeResponse: action.payload,
				groupListByTypeSuccess: false,
				groupListByTypeFailure: true
			};
		},

		getJobsListSuccess(state, action) {
			return {
				...state,
				jobsListResponse: action.payload,
				jobsListSuccess: true,
				jobsListFailure: false
			};
		},
		getStatusListSuccess(state, action) {
			return {
				...state,
				statusListResponse: action.payload,
				statusListSuccess: true,
				statusListFailure: false
			};
		}
	}
};
export default GroupListModel;
