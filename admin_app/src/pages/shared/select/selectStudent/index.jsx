/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import { useEffect } from "react";
import styles from "../../style/selectStyle.less";
import { connect, setLocale } from "umi";
setLocale("vi-VN", false);

const { Option } = Select;

const SelectStudent = props => {
	const {
		studentList,
		style,
		onChange,
		value,
		dispatch,
		onSelect,
		placeholder = "Chọn sinh viên",
		mode = null,
		tagRender = null
	} = props;

	useEffect(() => {
		dispatch({
			type: "studentAll/getAllStudentRequest"
		});
	}, []);

	const students = studentList?.items ? studentList?.items : [];

	return (
		<Select
			style={style}
			className={styles.fw}
			showSearch
			// allowClear
			value={value}
			onChange={onChange}
			onSelect={onSelect}
			placeholder={placeholder}
			mode={mode}
			tagRender={tagRender}
		>
			{students.length > 0 &&
				students.map((student, index) => (
					<Option value={student.id} key={student.id}>
						{student.studentName}
					</Option>
				))}
		</Select>
	);
};

const mapStateToProps = state => {
	return {
		studentList: state.studentAll.payload,
		success: state.studentAll.success
	};
};

export default connect(mapStateToProps)(SelectStudent);
