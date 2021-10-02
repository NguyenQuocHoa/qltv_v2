/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Col,
	Form,
	Row,
	Input,
	Checkbox,
	Button,
	Divider,
	Typography
} from "antd";
import { useHistory } from "react-router";
import styles from "../../shared/style/detailStyle.less";
import { connect, FormattedMessage } from "umi";
import { useEffect } from "react";

const { TextArea } = Input;
const { Title } = Typography;

const UpdatePost = props => {
	const {
		getDetailSuccess,
		detailPayload,
		updatePostSuccess,
		dispatch
	} = props;
	const [form] = Form.useForm();
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
		const converPayload = {
			id: +props.match.params.id,
			...payload
		};

		dispatch({
			type: "postUpdate/updatePostRequest",
			payload: converPayload
		});
	};

	useEffect(() => {
		if (updatePostSuccess) {
			dispatch({
				type: "postUpdate/clearState"
			});
			history.goBack();
		}
	}, [updatePostSuccess]);

	useEffect(() => {
		dispatch({
			type: "postDetail/getPostDetailRequest",
			id: +props.match.params.id
		});
	}, []);

	useEffect(() => {
		if (getDetailSuccess) {
			const data = detailPayload?.item?.value;
			form.setFieldsValue({ ...data });
		}
	}, [getDetailSuccess]);

	return (
		<div className={styles.container}>
			<Row>
				<Col>
					<Title level={4}>
						<FormattedMessage
							id="pages.post.titleForm"
							defaultMessage="THÔNG TIN BÀI VIẾT"
						/>
					</Title>
				</Col>
			</Row>
			<Form
				form={form}
				{...formLayout}
				layout="vertical"
				onFinish={handleSubmit}
			>
				<Row gutter={16} className={styles.fullSpan}>
					<Col xs={9}>
						<Form.Item
							name="codePost"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.post.codePost"
										defaultMessage="Mã bài viết"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Mã bài viết!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={9}>
						<Form.Item
							name="message"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.post.message"
										defaultMessage="Nội dung"
									/>
								</Title>
							}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Vui lòng nhập Nội dung!"
								}
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							name="isActive"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.post.state"
										defaultMessage="Trạng thái"
									/>
								</Title>
							}
							valuePropName="checked"
						>
							<Checkbox>
								<FormattedMessage
									id="pages.post.isUse"
									defaultMessage="Sử dụng"
								/>
							</Checkbox>
						</Form.Item>
					</Col>
					<Col xs={24}>
						<Form.Item
							name="description"
							label={
								<Title className={styles.title} level={5}>
									<FormattedMessage
										id="pages.post.description"
										defaultMessage="Ghi chú"
									/>
								</Title>
							}
							hasFeedback
						>
							<TextArea rows={4} />
						</Form.Item>
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
							{" "}
							<FormattedMessage
								id="pages.toBack"
								defaultMessage="Quay lại"
							/>
						</Button>
					</Col>
					<Col>
						<Button
							type="primary"
							icon={<SaveOutlined />}
							htmlType="submit"
						>
							{" "}
							<FormattedMessage
								id="pages.save"
								defaultMessage="Lưu"
							/>
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		loading: state.loading.effects["postUpdate/getPostUpdateRequest"],
		updatePayload: state.postUpdate.payload,
		updatePostSuccess: state.postUpdate.success,
		detailPayload: state.postDetail.payload,
		getDetailSuccess: state.postDetail.success
	};
};

export default connect(mapStateToProps)(UpdatePost);
