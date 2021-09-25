import { notification } from "antd";
import { deleteGroup } from "../../services/group";
const GroupDeleteModel = {
	namespace: "groupDelete",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteGroupRequest({ id }, { call, put }) {
			const response = yield call(deleteGroup, id);
			if (response?.status === 404) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "deleteGroupFailure",
					payload: response
				});
			} else {
				// notification.success({
				// 	message: "Xóa báo cáo thành công"
				// });
				yield put({
					type: "deleteGroupSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteGroupRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		deleteGroupSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		deleteGroupFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default GroupDeleteModel;
