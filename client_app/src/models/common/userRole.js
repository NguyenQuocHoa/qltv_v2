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
					payload: response.items
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
			roles.forEach(({ role_Id, view, create, update  }) => {
				const name = EROLE.find(r => r.id === role_Id)?.name ?? "";
				hashmap[name] = {
					xem: true,
					them: true,
					sua: true,
					xoa: true
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
