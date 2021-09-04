import { notification } from "antd";
import { getFileListByFolder } from "../../services/file";

const FileListModel = {
	namespace: "fileList",
	state: {
		payload: [],
		success: false,
		failure: false
	},
	effects: {
		*getFileListRequest({ payload }, { call, put }) {
			const response = yield call(getFileListByFolder, payload);
			if (response.status === 0) {
				yield put({
					type: "getFileListSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getFileListFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getFileListRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getFileListSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getFileListFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default FileListModel;
