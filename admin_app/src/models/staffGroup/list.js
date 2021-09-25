import { notification } from "antd";
import {
	getAllStaffGroupList,
	getStaffGroupList
} from "../../services/staffGroup";

const StaffGroupListModel = {
	namespace: "staffGroupList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allStaffGroups: [],
		allStaffGroupSuccess: false,
		allStaffGroupFailure: false
	},
	effects: {
		*getStaffGroupListRequest({ payload }, { call, put }) {
			const response = yield call(getStaffGroupList, payload);
			if (response.status === 0) {
				yield put({
					type: "getStaffGroupListSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getStaffGroupListFailure",
					payload: response
				});
			}
		},
		*getAllStaffGroupListRequest(_, { call, put }) {
			const response = yield call(getAllStaffGroupList);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllStaffGroupListFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAllStaffGroupListSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getStaffGroupListRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getStaffGroupListSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getStaffGroupListFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		},

		getAllStaffGroupListRequest(state, action) {
			return {
				...state,
				allStaffGroups: [],
				allStaffGroupSuccess: false,
				allStaffGroupFailure: false
			};
		},
		getAllStaffGroupListSuccess(state, action) {
			return {
				...state,
				allStaffGroups: action.payload,
				allStaffGroupSuccess: true,
				allStaffGroupFailure: false
			};
		},
		getAllStaffGroupListFailure(state, action) {
			return {
				...state,
				allStaffGroupSuccess: false,
				allStaffGroupFailure: true
			};
		}
	}
};
export default StaffGroupListModel;
