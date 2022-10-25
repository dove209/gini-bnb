/** query string 만들기 */
export const makeQueryString = (baseUrl: string, queriesObject: Object & { [key: string]: any } ) => {
    const keys = Object.keys(queriesObject);
    const valuse = Object.values(queriesObject);
    if (keys.length === 0) {
        return baseUrl;
    }

    let queryString = `${baseUrl}?`;
    keys.forEach((key, i) => {
        if (queriesObject[key]) {
            queryString += `${keys[i]}=${valuse[i]}&`;
        }
    });
    // 마지막 '&'제거
    return queryString.slice(0,-1);
}

/** 금액 변경시 */ 
export const makeMoneyString = (input: string) => {
    const numberPrice = Number(input).toLocaleString('ko-KR');
    return numberPrice;
}


/** 날짜 포맷 변경 */
export const makeDateFormat = (input: string, isFull: boolean = true) => {
    const date = new Date(Date.parse(input));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    if (isFull) {
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    } else {
        return `${year}년 ${month}월 ${day}일`;
    }    
}