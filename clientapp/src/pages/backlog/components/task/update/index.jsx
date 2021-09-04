/* eslint-disable react-hooks/exhaustive-deps */
import { CommentOutlined, SaveOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Tag,
	Typography
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "umi";
import styles from "./style.less";

const { TextArea } = Input;
const { Title } = Typography;

const STATUS = {
	OPEN: 1,
	REOPEN: 2,
	RESOLVE: 3,
	CLOSED: 4,
	TODO: 5,
	FIXED: 6,
	CLOSE: 7,
	INPROCCESS: 8,
	DONE: 9
};

const TaskDetail = props => {
	const [form] = Form.useForm();
	// const history = useHistory();
	const formLayout = {
		labelCol: {
			span: 10
		},
		wrapperCol: {
			span: 14
		}
	};

	const handleSubmit = payload => {};

	useEffect(() => {
		form.setFieldsValue({
			created: moment("2021-08-07T00:00:00"),
			updated: moment("2021-08-07T00:00:00")
		});
	}, []);

	return (
		<Row gutter={8} className={styles.container}>
			<Col xs={24}>
				{/* task name */}
				<Row>
					<Col>
						<Title level={5}>Đặt hàng thành công</Title>
					</Col>
				</Row>

				<Form form={form} {...formLayout} onFinish={handleSubmit}>
					<Row>
						<Col xs={12}>
							<Form.Item label="Estimate:" name="estimate">
								<InputNumber
									className={styles.fw}
									min={0}
									max={50}
								/>
							</Form.Item>
						</Col>
						<Col xs={8}>
							<Row justify="end">
								<Col></Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<Form.Item label="Remaining:" name="remaining">
								<InputNumber
									className={styles.fw}
									min={0}
									max={50}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col>
							<Title level={5}>Details</Title>
						</Col>
					</Row>
					<Row gutter={8}>
						<Col xs={12}>
							<Form.Item label="Status:" name="status">
								<SelectStatus />
							</Form.Item>
						</Col>
						<Col xs={12}>
							<Form.Item label="Reporter:" name="reporter">
								<SelectUser />
							</Form.Item>
						</Col>
						<Col xs={12}>
							<Form.Item label="Priority:" name="priority">
								<SelectPriority />
							</Form.Item>
						</Col>
						<Col xs={12}>
							<Form.Item label="Assignee:" name="assignee">
								<SelectUser />
							</Form.Item>
						</Col>
						<Col xs={12}>
							<Form.Item label="Labels:" name="labels">
								<SelectLabel />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col>
							<Title level={5}>Dates</Title>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<Form.Item name="created" label="Created:">
								<DatePicker
									disabled
									placeholder="Select date"
									className={styles.fw}
									format="DD/MM/YYYY"
								/>
							</Form.Item>
						</Col>
						<Col xs={12}>
							<Form.Item name="updated" label="Updated:">
								<DatePicker
									disabled
									placeholder="Select date"
									className={styles.fw}
									format="DD/MM/YYYY"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col>
							<Title level={5}>Description</Title>
						</Col>
					</Row>
					<Row>
						<Col xs={24}>
							<TextArea rows={3} />
						</Col>
					</Row>
					<Row>
						<Col>
							<Title level={5}>Comment</Title>
						</Col>
					</Row>
					<Row>
						<Col xs={24}>
							<TextArea rows={3} />
						</Col>
						<Col xs={24}>
							<Divider />
						</Col>
						<Col xs={24} className={styles.mt16}>
							<Button type="default" icon={<CommentOutlined />}>
								Comment
							</Button>
						</Col>
					</Row>
					{/* <Row justify="end" className={styles.mt16}>
						<Col>
							<Button type="primary" icon={<SaveOutlined />}>
								Cập nhật
							</Button>
						</Col>
					</Row> */}
				</Form>
			</Col>
		</Row>
	);
};

const mapStateToProps = state => {
	return {};
};

export default connect(mapStateToProps)(TaskDetail);

const { Option } = Select;

const SelectStatus = () => {
	const [value, setValue] = useState(["china"]);
	const handleChange = val => {
		console.log(`selected ${val}`);
		setValue([val]);
	};

	useEffect(() => {
		console.log("value", value);
	}, [value]);
	return (
		<Select
			style={{ width: "100%" }}
			placeholder="select one country"
			defaultValue={["NONE"]}
			onChange={handleChange}
			optionLabelProp="label"
		>
			<Option value="OPEN">
				<Tag color="geekblue">OPEN</Tag>
			</Option>
			<Option value="REOPEN">
				<Tag color="geekblue">RE-OPEN</Tag>
			</Option>
			<Option value="RESOLVE">
				<Tag color="geekblue">RESOLVE</Tag>
			</Option>
			<Option value="CLOSED">
				<Tag color="geekblue">CLOSED</Tag>
			</Option>
			<Option value="TODO">
				<Tag color="geekblue">TODO</Tag>
			</Option>
			<Option value="FIXED">
				<Tag color="geekblue">FIXED</Tag>
			</Option>
			<Option value="CLOSE">
				<Tag color="geekblue">CLOSE</Tag>
			</Option>
			<Option value="INPROCCESS">
				<Tag color="geekblue">INPROCCESS</Tag>
			</Option>
			<Option value="DONE">
				<Tag color="geekblue">DONE</Tag>
			</Option>
		</Select>
	);
};

const SelectPriority = () => {
	const [value, setValue] = useState(["china"]);
	const handleChange = val => {
		console.log(`selected ${val}`);
		setValue([val]);
	};

	useEffect(() => {
		console.log("value", value);
	}, [value]);
	return (
		<Select
			style={{ width: "100%" }}
			placeholder="select one country"
			defaultValue={["NONE"]}
			onChange={handleChange}
			optionLabelProp="label"
		>
			<Option value="HIGH">
				<Tag color="geekblue">HIGH</Tag>
			</Option>
			<Option value="MEDIUM">
				<Tag color="geekblue">MEDIUM</Tag>
			</Option>
			<Option value="LOW">
				<Tag color="geekblue">LOW</Tag>
			</Option>
		</Select>
	);
};

// LẤY TỪ COMPONENT USER
const SelectUser = () => {
	const [value, setValue] = useState(["china"]);
	const handleChange = val => {
		console.log(`selected ${val}`);
		setValue([val]);
	};

	useEffect(() => {
		console.log("value", value);
	}, [value]);
	return (
		<Select
			style={{ width: "100%" }}
			placeholder="select one country"
			defaultValue={["NONE"]}
			onChange={handleChange}
			optionLabelProp="label"
		>
			<Option value="1">
				<Tag color="geekblue">HÒA</Tag>
			</Option>
			<Option value="2">
				<Tag color="geekblue">ĐẠT</Tag>
			</Option>
			<Option value="3">
				<Tag color="geekblue">NHỰT</Tag>
			</Option>
		</Select>
	);
};

const SelectLabel = () => {
	const [value, setValue] = useState(["china"]);
	const handleChange = val => {
		console.log(`selected ${val}`);
		setValue([val]);
	};

	useEffect(() => {
		console.log("value", value);
	}, [value]);
	return (
		<Select
			style={{ width: "100%" }}
			placeholder="select one country"
			defaultValue={["NONE"]}
			onChange={handleChange}
			optionLabelProp="label"
		>
			<Option value="1">
				<Tag color="geekblue">TEST</Tag>
			</Option>
			<Option value="2">
				<Tag color="geekblue">DEVELOP</Tag>
			</Option>
			<Option value="3">
				<Tag color="geekblue">DESIGN</Tag>
			</Option>
		</Select>
	);
};
