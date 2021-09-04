import request from "@/utils/request";

export async function getAuthToken(payload) {
	return request("/api/Auth/token", {
		method: "POST",
		data: payload
	});
}

export async function getFakeCaptcha(mobile) {
	return request(`/api/login/captcha?mobile=${mobile}`);
}
