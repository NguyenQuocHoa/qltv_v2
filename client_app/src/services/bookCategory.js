import request from "../utils/request";

export async function getAllBookCategory() {
	return request(`/api/BookCategory/get-all`);
}

export async function getBookCategoryPaging({ params, body }) {
	return request(
		`/api/BookCategory/get-all-paging?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`,
		{
			method: "POST",
			data: body
		}
	);
}

export async function getBookCategoryDetail(id) {
	return request(`/api/BookCategory/get-by-id/${id}`);
}

export async function createBookCategory(payload) {
	return request("/api/BookCategory/create", {
		method: "POST",
		data: payload
	});
}

export async function updateBookCategory(payload) {
	return request(`/api/BookCategory/update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteBookCategory(id) {
	return request(`/api/BookCategory/delete/${id}`, { method: "DELETE" });
}

export async function getDataOptions() {
	return request(`/api/BookCategory/GetDataOptions`);
}
