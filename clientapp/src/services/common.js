// inclue api getall like user, customer, ... etc
import request from "../utils/request";
export async function getAllListUser() {
	return request("/api/User/GetAllUserAsync");
}

export async function getAllListPermissionGroup() {
	return request(`/api/GroupRole/GetForSelect`);
}

export async function getAllUserRoleById(id) {
	return request(`/api/NhanVienRole/Get?nhanVien_Id=${id}`);
}
