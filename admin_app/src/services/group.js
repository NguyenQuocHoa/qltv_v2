import request from "../utils/request";

export async function getGroupList({
	search,
	type,
	column,
	dir,
	page,
	p_size
}) {
	return request(
		`/api/Nhom/GetAll?search=${search}&type=${type}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}`
	);
}

export async function getGroupDetail(id) {
	return request(`/api/Nhom/GetById/${id}`);
}

export async function createGroup(payload) {
	return request("/api/Nhom/Create", {
		method: "POST",
		data: payload
	});
}

export async function updateGroup(payload) {
	return request(`/api​/Nhom​/Update​/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteGroup(id) {
	return request(`/api/Nhom/Delete/${id}`, { method: "DELETE" });
}

export async function getGroupListByType(type) {
	return request(`/api/Nhom/GetAllByLoaiNhom?loaiNhom=${type}`);
}
