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