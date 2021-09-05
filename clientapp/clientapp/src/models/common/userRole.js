import { notification } from "antd";
import { getAllUserRoleById } from "../../services/common";
import { EROLE } from "../../utils/utils";

const UserRoleModel = {
	namespace: "UserRole",
	state: {
		payload: [],
		success: false,
		failure: false,

		userRoles: [],
		userRolesSuccess: false,
		userRolesFailure: false
	},
	effects: {
		*getAllUserRoleByIdRequest({ id }, { call, put }) {
			const response = yield call(getAllUserRoleById, id);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllUserRoleByIdFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getAllUserRoleByIdSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllUserRoleByIdRequest(state, action) {
			return {
				...state,
				userRoles: [],
				userSuccess: false,
				userFailure: false
			};
		},
		getAllUserRoleByIdSuccess(state, action) {
			const roles = action.payload;
			const hashmap = {};
			roles.forEach(({ role_Id, xem, them, sua, xoa }) => {
				const name = EROLE.find(r => r.id === role_Id)?.name ?? "";
				hashmap[name] = {
					xem: xem,
					them: them,
					sua: sua,
					xoa: xoa
				};
			});

			return {
				...state,
				userRoles: hashmap,
				userSuccess: true,
				userFailure: false
			};
		},
		getAllUserRoleByIdFailure(state, action) {
			return {
				...state,
				userRoles: [],
				userSuccess: false,
				userFailure: true
			};
		}
	}
};
export default UserRoleModel;
