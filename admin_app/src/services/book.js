import request from "../utils/request";

export async function getAllBook() {
	return request(`/api/Book/get-all`);
}

export async function getBookPaging({ params, body }) {
	return request(
		`/api/Book/get-all-paging?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`,
		{
			method: "POST",
			data: body
		}
	);
}

export async function getBookDetail(id) {
	return request(`/api/Book/get-by-id/${id}`);
}

export async function createBook(payload) {
	return request("/api/Book/create", {
		method: "POST",
		data: payload
	});
}

export async function updateBook(payload) {
	return request(`/api/Book/update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteBook(id) {
	return request(`/api/Book/delete/${id}`, { method: "DELETE" });
}

export async function getDataOptions() {
	return request(`/api/Book/GetDataOptions`);
}
