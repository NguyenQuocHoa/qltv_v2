import { notification } from "antd";
import { getGroupDetail } from "../../services/group";
const GroupDetailModel = {
	namespace: "groupDetail",
	state: {
		response: {},
		success: false,
		failure: false
	},
	effects: {
		*getGroupDetailRequest({ id }, { call, put }) {
			const response = yield call(getGroupDetail, id);
			const { message } = response;
			if (response.status === 404) {
				notification.error({
					message: message
				});
				yield put({
					type: "getGroupDetailFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getGroupDetailSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getGroupDetailRequest(state, action) {
			return {
				...state,
				response: {},
				success: false,
				failure: false
			};
		},
		getGroupDetailSuccess(state, action) {
			return {
				...state,
				response: action.payload,
				success: true,
				failure: false
			};
		},
		getGroupDetailFailure(state, action) {
			return {
				...state,
				response: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default GroupDetailModel;
