import { notification } from "antd";
import { updateGroup } from "../../services/group";
const GroupUpdateModel = {
	namespace: "groupUpdate",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*updateGroupRequest({ payload }, { call, put }) {
			const response = yield call(updateGroup, payload);
			const { message } = response;
			if (response.status === 0) {
				yield put({
					type: "updateGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "updateGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateGroupRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		updateGroupSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		updateGroupFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default GroupUpdateModel;
