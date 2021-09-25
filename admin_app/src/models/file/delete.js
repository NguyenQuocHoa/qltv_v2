import { notification } from "antd";
import { deleteFile } from "../../services/file";

const FileDeleteModel = {
	namespace: "fileDelete",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*deleteFileRequest({ id }, { call, put }) {
			const response = yield call(deleteFile, id);
			if (response?.code == 200) {
				notification.success({
					message: "Đã xóa tập tin!"
				});
				yield put({
					type: "deleteFileSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra khi xóa tập tin"
				});
				yield put({
					type: "deleteFileFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		deleteFileRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		deleteFileSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		deleteFileFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default FileDeleteModel;
