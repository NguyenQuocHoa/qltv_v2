import request from "../utils/request";

export async function getAllBook() {
	return request(`/api/Book/get-all`);
}

export async function getAllBookPaging({ pageIndex, pageSize }) {
	return request(
		`/api/Book/get-all-paging?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);
}

// export async function getBookDetail(id) {
// 	return request(`/api/KhachHang/GetById/${id}`);
// }

// export async function createBook(payload) {
// 	return request("/api/KhachHang/Create", {
// 		method: "POST",
// 		data: payload
// 	});
// }

// export async function updateBook(payload) {
// 	return request(`/api/KhachHang/Update/${payload.id}`, {
// 		method: "PUT",
// 		data: payload
// 	});
// }

// export async function deleteBook(id) {
// 	return request(`/api/KhachHang/Delete/${id}`, { method: "DELETE" });
// }

// export async function getDataOptions() {
// 	return request(`/api/KhachHang/GetDataOptions`);
// }
