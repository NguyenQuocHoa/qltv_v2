import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomUploadAdapterPlugin from "../ckeditorUploadAdapter";
import { useEffect } from "react";
import { useState } from "react";

const Editor = props => {
	const { onChange, value } = props;
	const [data, setData] = useState(value);

	useEffect(() => {
		setData(value);
	}, [value]);

	return (
		<CKEditor
			editor={ClassicEditor}
			config={{
				extraPlugins: [CustomUploadAdapterPlugin]
			}}
			data={data}
			onChange={(event, editor) => {
				const data = editor.getData();
				onChange(data);
			}}
		/>
	);
};

export default Editor;
