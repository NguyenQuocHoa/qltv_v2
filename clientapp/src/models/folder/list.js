import { notification } from "antd";
import { getFolderList } from "../../services/folder";

const FolderListModel = {
	namespace: "folderList",
	state: {
		payload: [],
		success: false,
		failure: false
	},
	effects: {
		*getFolderListRequest({ payload }, { call, put }) {
			const response = yield call(getFolderList, payload);
			if (response.status === 0) {
				yield put({
					type: "getFolderListSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getFolderListFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getFolderListRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getFolderListSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getFolderListFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default FolderListModel;
