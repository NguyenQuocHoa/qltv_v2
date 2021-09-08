import { notification } from "antd";
import { createFile } from "../../services/file";

const FileCreateModel = {
	namespace: "fileCreate",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*createFileRequest({ payload }, { call, put }) {
			const response = yield call(createFile, payload);
			if (response?.code == 200) {
				notification.success({
					message: "Thêm tập tin mới thành công"
				});
				yield put({
					type: "createFileSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: "Có lỗi xảy ra."
				});
				yield put({
					type: "createFileFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		createFileRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		createFileSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		createFileFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default FileCreateModel;
