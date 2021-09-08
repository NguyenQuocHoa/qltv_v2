import request from "@/utils/request";

export async function getFileListByFolder({
	search,
	column,
	dir,
	page,
	p_size,
	folderId
}) {
	return request(
		`/api/File/GetAllByFolder?search=${search}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}&thuMucId=${folderId}`
	);
}

export async function createFile(payload) {
	return request("/api/File/Create", {
		method: "POST",
		data: payload
	});
}

export async function updateFile(payload) {
	return request(`/api/File/Update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}
export async function downloadFile(id) {
	return request(`/api/File/Download/${id}`);
}

export async function deleteFile(id) {
	return request(`/api/File/Delete/${id}`, { method: "DELETE" });
}
