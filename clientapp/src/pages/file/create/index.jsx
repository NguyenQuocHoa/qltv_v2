import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Col, Form, Row, Input, Button, Divider } from "antd";
import { useHistory } from "react-router";
import styles from "./style.less";
import { connect } from "umi";
import UploadSingleImage from "../../shared/uploadSingleImage";
import { useState } from "react";

const Create = props => {
	const { dispatch } = props;
	const id = props.match.params.id;
	const [form] = Form.useForm();
	const [extraInfo, setExtraInfo] = useState({
		linkLuuFile: "",
		kichThuoc: 0
	});

	const history = useHistory();
	const formLayout = {
		labelCol: {
			span: 12
		},
		wrapperCol: {
			span: 24
		}
	};

	const handleSubmit = payload => {
		const newPayload = {
			tenFile: payload.tenFile,
			linkLuuFile: extraInfo.linkLuuFile,
			loaiFile: payload.loaiFile,
			thuMuc: id,
			kichThuoc: extraInfo.kichThuoc
		};
		dispatch({
			type: "fileCreate/createFileRequest",
			payload: newPayload
		});
	};

	const handleUploadFile = payload => {
		form.setFieldsValue({
			tenFile: payload.filename,
			loaiFile: payload.type
		});
		setExtraInfo({
			linkLuuFile: payload.path,
			kichThuoc: payload.size
		});
	};

	return (
		<div className={styles.container}>
			<Form
				form={form}
				{...formLayout}
				layout="vertical"
				onFinish={handleSubmit}
			>
				<Row gutter={8}>
					<Col xs={12}>
						<Form.Item name="tenFile" label="Tên tập tin">
							<Input />
						</Form.Item>
					</Col>
					<Col xs={12}>
						<Form.Item label="Loại tập tin" name="loaiFile">
							<Input disabled />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col xs={24}>
						<UploadSingleImage
							mode={2}
							onUploadSuccess={handleUploadFile}
						/>
					</Col>
				</Row>
				<Divider />
				<Row justify="end" gutter={8}>
					<Col>
						<Button
							type="default"
							icon={<LeftOutlined />}
							onClick={() => {
								history.goBack();
							}}
						>
							Trở về
						</Button>
					</Col>
					<Col>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							htmlType="submit"
						>
							Lưu
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.loading.effects["fileCreate/createFileRequest"]
	};
};

export default connect(mapStateToProps)(Create);
