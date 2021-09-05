import request from "../utils/request";

export async function getPermissionGroupList({
	search,
	column,
	dir,
	page,
	p_size
}) {
	return request(
		`/api/GroupRole/get?search=${search}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}`
	);
}

export async function getPermissionGroupDetail(id) {
	return request(`/api/GroupRole/${id}`);
}

export async function createPermissionGroup(payload) {
	return request("/api/GroupRole", {
		method: "POST",
		data: payload
	});
}

export async function updatePermissionGroup(payload) {
	return request(`/api/GroupRole/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deletePermissionGroup(id) {
	return request(`/api/GroupRole/${id}`, { method: "DELETE" });
}
