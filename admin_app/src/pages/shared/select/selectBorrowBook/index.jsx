/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from "antd";
import { useEffect } from "react";
import styles from "../../style/selectStyle.less";
import { connect, setLocale } from "umi";
setLocale("vi-VN", false);

const { Option } = Select;

const SelectBorrowBook = props => {
	const {
		borrowBookList,
		success,
		hashmap,
		style,
		onChange,
		value,
		dispatch,
		onSelect,
		placeholder = "Chọn phiếu mượn sách",
		mode = null,
		tagRender = null
	} = props;

	useEffect(() => {
		dispatch({
			type: "borrowBookAll/getAllBorrowBookNotReturnRequest"
		});
	}, []);

	const handleFilter = (inputValue, option) => {
		if (success) {
			let title = hashmap[option.key]?.borrowBookCode || "";
			if (title.toLowerCase().includes(inputValue.toLowerCase())) {
				return true;
			}
		}
	};

	const borrowBooks = borrowBookList?.items ? borrowBookList?.items : [];

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
			filterOption={handleFilter}
		>
			{borrowBooks.length > 0 &&
				borrowBooks.map((borrowBook, index) => (
					<Option value={borrowBook.id} key={borrowBook.id}>
						{/* {`${borrowBook.borrowBookCode}_${borrowBook.studentCode}_${borrowBook.studentName}`} */}
						{borrowBook.borrowBookCode}
					</Option>
				))}
		</Select>
	);
};

const mapStateToProps = state => {
	return {
		borrowBookList: state.borrowBookAll.payload,
		success: state.borrowBookAll.success,
		hashmap: state.borrowBookAll.hashmap
	};
};

export default connect(mapStateToProps)(SelectBorrowBook);
