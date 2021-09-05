import { notification } from "antd";
import { downloadFile } from "../../services/file";

const FileDownloadModel = {
	namespace: "fileDownload",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*downloadFileRequest({ id }, { call, put }) {
			const response = yield call(downloadFile, id);
			if (response?.code == 200) {
				yield put({
					type: "downloadFileSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra"
				});
				yield put({
					type: "downloadFileFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		downloadFileRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		downloadFileSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		downloadFileFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default FileDownloadModel;
