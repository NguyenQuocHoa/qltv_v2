/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import { useEffect } from "react";
import styles from "../../style/selectStyle.less";
import { connect, setLocale } from "umi";
setLocale("vi-VN", false);

const { Option } = Select;

const SelectCategory = props => {
	const {
		bookCategoryList,
		style,
		onChange,
		value,
		dispatch,
		onSelect,
		placeholder = "Chọn loại sách",
		mode = null,
		tagRender = null
	} = props;

	useEffect(() => {
		dispatch({
			type: "bookCategoryAll/getAllBookCategoryRequest"
		});
	}, []);

	const categories = bookCategoryList?.items ? bookCategoryList?.items : [];

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
			{categories.length > 0 &&
				categories.map((bookCategory, index) => (
					<Option value={bookCategory.id} key={bookCategory.id}>
						{bookCategory.bookCategoryName}
					</Option>
				))}
		</Select>
	);
};

const mapStateToProps = state => {
	return {
		bookCategoryList: state.bookCategoryAll.payload,
		success: state.bookCategoryAll.success
	};
};

export default connect(mapStateToProps)(SelectCategory);
