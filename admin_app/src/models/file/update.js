import { notification } from "antd";
import { updateFile } from "../../services/file";

const FileUpdateModel = {
	namespace: "fileUpdate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*updateFileRequest({ payload }, { call, put }) {
			const response = yield call(updateFile, payload);
			if (response?.code == 200) {
				notification.success({
					message: "Cập nhật thông tin tập tin thành công!"
				});
				yield put({
					type: "updateFileSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra"
				});
				yield put({
					type: "updateFileFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		updateFileRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		updateFileSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		updateFileFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default FileUpdateModel;
