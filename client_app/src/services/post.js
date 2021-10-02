import request from "../utils/request";

export async function getAllPost() {
	return request(`/api/Post/get-all`);
}

export async function getPostPaging({ params, body }) {
	return request(
		`/api/Post/get-all-paging?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`,
		{
			method: "POST",
			data: body
		}
	);
}

export async function getPostDetail(id) {
	return request(`/api/Post/get-by-id/${id}`);
}

export async function createPost(payload) {
	return request("/api/Post/create", {
		method: "POST",
		data: payload
	});
}

export async function updatePost(payload) {
	return request(`/api/Post/update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deletePost(id) {
	return request(`/api/Post/delete/${id}`, { method: "DELETE" });
}

export async function getDataOptions() {
	return request(`/api/Post/GetDataOptions`);
}
