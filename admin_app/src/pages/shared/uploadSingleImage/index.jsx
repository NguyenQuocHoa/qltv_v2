/* eslint-disable react-hooks/exhaustive-deps */
import { FileOutlined, InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Col, message, Row, Upload } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./style.less";

const { Dragger } = Upload;

const UploadSingleImage = props => {
	const { onUploadSuccess, title = "", mode = 1, image } = props;

	const [previewImage, setPreviewImage] = useState(image);

	useEffect(() => {
		setPreviewImage(image);
	}, [image]);
	const sid = localStorage.getItem("sid");
	const uploadProps = {
		name: "file",
		multiple: false,
		showUploadList: false,
		action: `api/File/Uploads`,
		headers: {
			Authorization: sid
		},
		onChange(info) {
			if (info.file.status !== "uploading") {
				// console.log(info.file.response);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
				onUploadSuccess(info.file.response);
				if (mode == 2) {
					setPreviewImage(info.file.response);
				}
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	return (
		<Dragger
			style={mode == 1 ? { background: "#fff", border: "none" } : null}
			{...uploadProps}
		>
			{mode == 1 && (
				<>
					<Row
						className={styles.circle}
						justify="center"
						align="middle"
					>
						<Col>
							<PlusOutlined size="large" />
						</Col>
					</Row>
					<Row justify="center">{title}</Row>
				</>
			)}

			{mode == 2 ? (
				!previewImage ? (
					<>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag file to this area to upload
						</p>
					</>
				) : (
					<FileOutlined style={{ fontSize: 148 }} />
				)
			) : null}
		</Dragger>
	);
};

export default UploadSingleImage;
