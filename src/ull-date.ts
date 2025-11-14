const toString = (date: Date) => {
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hour = date.getHours().toString().padStart(2, '0');
	const minute = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
};

const toStringFormat = (date: Date, format: string) => {
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hour = date.getHours().toString().padStart(2, '0');
	const minute = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	return format
		.replace('yyyy', year)
		.replace('MM', month)
		.replace('dd', day)
		.replace('HH', hour)
		.replace('mm', minute)
		.replace('ss', seconds);
};

const minutesToTimeFormat = (minutes: number): string => {
	const totalSeconds = minutes * 60;
	const hours = Math.floor(totalSeconds / 3600);
	const remainingSeconds = totalSeconds % 3600;
	const mins = Math.floor(remainingSeconds / 60);
	const seconds = Math.floor(remainingSeconds % 60);

	const pad = (num: number): string => num.toString().padStart(2, '0');

	return `${pad(hours)}:${pad(mins)}:${pad(seconds)}`;
}

const minutesToUnitsTime = (minutes: number): string => {
	const totalSeconds = minutes * 60;
	const years = Math.floor(totalSeconds / 31536000);
	const days = Math.floor((totalSeconds % 31536000) / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.floor(totalSeconds % 60);
  
	const yearsString = years > 0 ? `${years} years` : '';
	const daysString = days > 0 ? `${days} days ` : '';
	const hoursString = hours > 0 ? `${hours} hours ` : '';
	const minutesString = minutesLeft > 0 ? `${minutesLeft} minutes ` : '';
	const secondsString = seconds > 0 ? `${seconds} seconds` : '';
  
	return yearsString + daysString + hoursString + minutesString + secondsString;
}
 
const getFirstDayOfMonth = (date: Date) => {
	return new Date(date.getFullYear(), date.getMonth(), 1);
};
  
const getLastDayOfMonth = (date: Date) => {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

enum DateFormat {
	DATE_TIME = 'yyyy-MM-dd HH:mm:ss',
	DATE = 'yyyy-MM-dd',
	TIME = 'HH:mm:ss',
	JAVA = 'yyyy-MM-ddTHH:mm:ss',
	DATE_TIME_WITHOUT_SECONDS = 'yyyy-MM-dd HH:mm',
}

export const ullDate = {
	toString, toStringFormat, DateFormat, minutesToTimeFormat, minutesToUnitsTime, getFirstDayOfMonth, getLastDayOfMonth
};