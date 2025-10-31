export const ip = '192.168.1.246'


function formatDateToDDMMYY(date: Date | string, separator: string = '/'): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format provided');
    }

    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // months start at 0
    const year = String(parsedDate.getFullYear()).slice(-2); // last two digits of year

    return `${day}${separator}${month}${separator}${year}`;
}

export default formatDateToDDMMYY;