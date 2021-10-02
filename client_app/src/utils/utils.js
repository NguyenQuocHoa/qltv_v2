import { parse } from "querystring";
import moment from "moment";
import "moment/locale/vi";
// Set language vietnam for date
moment.locale("vi");
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
	if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === "site") {
		return true;
	}

	return window.location.hostname === "preview.pro.ant.design";
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
	const { NODE_ENV } = process.env;

	if (NODE_ENV === "development") {
		return true;
	}

	return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split("?")[1]);

export const numberWithComas = x => {
	return typeof x !== "undefined" && !isNaN(x)
		? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		: null;
};

export const getListWeekDateOfMonth = dateValue => {
	let momentRange = require("moment-range");
	momentRange.extendMoment(moment);
	let year = dateValue.format("YYYY");
	let month = dateValue.format("MM") - 1;
	let dateData = moment.utc([year, month]);

	let firstDay = moment(dateData).startOf("month");
	let endDay = moment(dateData).endOf("month");
	let monthRange = moment.range(firstDay, endDay);
	let weeks = [];
	for (let mday of monthRange.by("days")) {
		if (weeks.indexOf(mday.week()) === -1) {
			weeks.push(mday.week());
		}
	}
	let calendar = [];
	for (let index = 0; index < weeks.length; index++) {
		var weeknumber = weeks[index];
		let firstWeekDay = moment()
			.year(year)
			.month(month)
			.week(weeknumber)
			.day(1);
		if (firstWeekDay.isBefore(firstDay)) {
			firstWeekDay = firstDay;
		}
		let lastWeekDay = moment()
			.year(year)
			.month(month)
			.week(weeknumber)
			.day(6);
		if (lastWeekDay.isAfter(endDay)) {
			lastWeekDay = endDay;
		}
		let weekRange = moment.range(firstWeekDay, lastWeekDay);
		calendar.push(weekRange);
	}
	return calendar;
};

export const getListOptionWeek = (listDateOfWeek, conditionCheck) => {
	let newListDate = [];
	let skipFirst = false;
	let skipLast = false;
	console.log("calendar", listDateOfWeek);
	for (var index = 0; index < listDateOfWeek.length; index++) {
		let objRange = {};
		let data = listDateOfWeek[index];

		if (data.start.diff(data.end, "days") <= conditionCheck && index == 0) {
			objRange = moment.range(data.start, listDateOfWeek[index + 1].end);
			skipFirst = true;
		} else if (
			index + 1 == listDateOfWeek.length - 1 &&
			listDateOfWeek[index + 1].end.diff(
				listDateOfWeek[index + 1].start,
				"days"
			) <= conditionCheck
		) {
			objRange = moment.range(data.start, listDateOfWeek[index + 1].end);
			skipLast = true;
			console.log("index last", index);
		} else {
			objRange = data;
		}
		if (skipFirst) {
			if (index !== 1) {
				if (index == 0) {
					objRange.weekName =
						"Tuần 0" +
						(index + 1) +
						": " +
						objRange.start.format("DD/MM/YYYY") +
						"-" +
						objRange.end.format("DD/MM/YYYY");
				} else {
					objRange.weekName =
						"Tuần 0" +
						index +
						": " +
						objRange.start.format("DD/MM/YYYY") +
						"-" +
						objRange.end.format("DD/MM/YYYY");
				}
				newListDate.push(objRange);
			}
		} else {
			newListDate.push(objRange);
			objRange.weekName =
				"Tuần 0" +
				(index + 1) +
				": " +
				objRange.start.format("DD/MM/YYYY") +
				"-" +
				objRange.end.format("DD/MM/YYYY");
		}
		if (skipLast) {
			console.log("objRange", objRange);
			break;
		}
	}

	return newListDate;
};

export const getDateISOWeek = date => {
	var startOfWeek = moment(date).startOf("isoWeek");
	var endOfWeek = moment(date).endOf("isoWeek");

	var days = [];
	var day = startOfWeek;

	while (day <= endOfWeek) {
		days.push(day.toDate());
		day = day.clone().add(1, "d");
	}

	return days;
};

// Set text uppercase each character after space like "Thứ Sáu", "Thứ Bảy"
export const titleCase = str => {
	var splitStr = str.toLowerCase().split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		// You do not need to check if i is larger than splitStr length, as your for does that for you
		// Assign it back to the array
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	// Directly return the joined string
	return splitStr.join(" ");
};

export const toDate = timestamp => {
	return moment(timestamp).format("YYYY-MM-DD");
};

export const toDateTime = timestamp => {
	return moment(timestamp).format("HH:mm:ss DD/MM/YYYY");
};

export const subtractHours = (time1, time2) => {
	if (time1 != "" && time2 != "") {
		var split1 = time1.split(":");
		var hour1 = split1[0];
		var minute1 = split1[1];

		var split2 = time2.split(":");
		var hour2 = split2[0];
		var minute2 = split2[1];

		var rhour = +hour2 - +hour1;
		var rminute = 0;

		if (+minute2 < +minute1) {
			rminute = +minute2 + 60 - +minute1;
			rhour -= 1;
		} else {
			rminute = +minute2 - +minute1;
		}
		return `${rhour}h${rminute > 0 ? rminute + "'" : ""}`;
	}
	return "";
};

export const removeAccents = str => {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D");
};

export const isVietnamesePhoneNumber = number => {
	return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
};

export const createDateAsUTC = date => {
	return new Date(
		Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds()
		)
	);
};

export const EROLE = [
	{ id: 1, name: "NHANVIEN", path: "/accounts" },
	{ id: 2, name: "BOOK", path: "/books" },
	{ id: 3, name: "BCATEGORY", path: "/book-category" },
	{ id: 4, name: "BBOOK", path: "/borrow-book" },
	{ id: 5, name: "POST", path: "/posts" },
	{ id: 6, name: "AUTH", path: "/auth" },
	{ id: 7, name: "RBOOK", path: "/return-book" },
	{ id: 8, name: "STUDENT", path: "/students" }
];

export const generateCode = (name = "") => {
	const d = new Date();
	const year = d.getFullYear();
	const month =
		1 + d.getMonth() > 10 ? 1 + d.getMonth() : "0" + (1 + d.getMonth());
	const date = d.getDate() > 10 ? d.getDate() : "0" + d.getDate();
	const hour = d.getHours() > 10 ? d.getHours() : "0" + d.getHours();
	const minute = d.getMinutes() > 10 ? d.getMinutes() : "0" + d.getMinutes();
	const second = d.getSeconds() > 10 ? d.getSeconds() : "0" + d.getSeconds();
	return name + year + month + date + hour + minute + second;
};
