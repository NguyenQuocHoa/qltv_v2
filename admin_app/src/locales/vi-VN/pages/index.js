/* eslint-disable import/no-anonymous-default-export */
import book from "./book";
import bookCategory from "./bookCategory";
import borrowBook from "./borrowBook";
import common from "./common";
import post from "./post";
import returnBook from "./returnBook";
import student from "./student";
import user from "./user";

export default {
	...book,
	...bookCategory,
	...borrowBook,
	...common,
	...post,
	...returnBook,
	...student,
	...user
};
