import request from "@/utils/request";

export async function getFolderList({
	search,
	column,
	dir,
	page,
	p_size,
	type
}) {
	return request(
		`/api/Nhom/GetAll?search=${search}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}&type=13`
	);
}

export async function createFolder(payload) {
	return request("/api/Nhom/Create", {
		method: "POST",
		data: payload
	});
}

export async function updateFolder(payload) {
	return request(`/api/Nhom/Update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteFolder(id) {
	return request(`/api/Nhom/Delete/${id}`, { method: "DELETE" });
}
