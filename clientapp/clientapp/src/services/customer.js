import request from "../utils/request";

export async function getCustomerList({ search, column, dir, page, p_size }) {
	return request(
		`/api/KhachHang/GetAll?search=${search}&column=${column}&dir=${dir}&page=${page}&p_size=${p_size}`
	);
}

export async function getAllCustomerForSelect() {
	return request(`/api/KhachHang/GetAllForSelect`);
}

export async function getAllCustomerList() {
	return request(`/api/KhachHang/GetAllKhachHangAsync`);
}

export async function getCustomerDetail(id) {
	return request(`/api/KhachHang/GetById/${id}`);
}

export async function createCustomer(payload) {
	return request("/api/KhachHang/Create", {
		method: "POST",
		data: payload
	});
}

export async function updateCustomer(payload) {
	return request(`/api/KhachHang/Update/${payload.id}`, {
		method: "PUT",
		data: payload
	});
}

export async function deleteCustomer(id) {
	return request(`/api/KhachHang/Delete/${id}`, { method: "DELETE" });
}

export async function getDataOptions() {
	return request(`/api/KhachHang/GetDataOptions`);
}
