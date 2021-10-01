import { notification } from "antd";
import { createGroup } from "../../services/group";
const GroupCreateModel = {
	namespace: "groupCreate",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*createGroupRequest({ payload }, { call, put }) {
			const response = yield call(createGroup, payload);
			const { message } = response;
			if (response.status === 0) {
				yield put({
					type: "createGroupSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: message
				});
				yield put({
					type: "createGroupFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createGroupRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		createGroupSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		createGroupFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default GroupCreateModel;
