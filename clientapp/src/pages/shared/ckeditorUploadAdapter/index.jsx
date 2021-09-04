import axios from "axios";

const dataURLtoFile = (dataurl, filename) => {
	const arr = dataurl.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n) {
		u8arr[n - 1] = bstr.charCodeAt(n - 1);
		n -= 1; // to make eslint happy
	}
	return new File([u8arr], filename, { type: mime });
};
class UploadAdapter {
	constructor(loader) {
		// The file loader instance to use during the upload.
		this.loader = loader;
	}

	// Starts the upload process.
	upload() {
		return this.loader.file.then(
			file =>
				new Promise((resolve, reject) => {
					const toBase64 = file =>
						new Promise((resolve, reject) => {
							const reader = new FileReader();
							reader.readAsDataURL(file);
							reader.onload = () => resolve(reader.result);
							reader.onerror = error => reject(error);
						});

					return toBase64(file).then(cFile => {
						let sid = localStorage.getItem("sid");
						var formData = new FormData();
						formData.append("file[]", dataURLtoFile(cFile));
						return axios
							.post(
								`${API_ENDPOINT}api/upload-image`,
								formData,
								{
									headers: {
										"Content-Type": "multipart/form-data",
										Authorization: sid
									}
								}
							)
							.then(d => {
								console.log(d.data.data[0]);
								if (d.data.code === 0) {
									this.loader.uploaded = true;
									resolve({
										default: d?.data?.data[0]?.image_link
									});
								} else {
									reject(
										`Couldn't upload file: ${file.name}.`
									);
								}
							});
					});
				})
		);
	}
}

// ...

export default function CustomUploadAdapterPlugin(editor) {
	editor.plugins.get("FileRepository").createUploadAdapter = loader => {
		// Configure the URL to the upload script in your back-end here!
		return new UploadAdapter(loader);
	};
}
