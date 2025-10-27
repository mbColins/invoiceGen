export function formatDate(isoString: string): string {
    if (!isoString) return '';

    const date = new Date(isoString);

    const day = date.getDate(); // 1-31
    const month = date.toLocaleString('default', { month: 'long' }); // "June"
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}