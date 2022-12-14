/* eslint-disable import/no-anonymous-default-export */
import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "../../types/user";

/**
 * 유저 리스트 데이터 불러오기
 */
const getList = () => {
    const usersBuffer = readFileSync('database/users.json');
    const usersString = usersBuffer.toString();
    if (!usersString) {
        return [];
    }
    const users: StoredUserType[] = JSON.parse(usersString);
    return users;
};


/**
 * email의 유저가 있는지 확인
 */
const existEmail = ({ email }: { email: string }) => {
    const users = getList();
    return users.some((user) => user.email === email);
};

/**
 * 유저 리스트 저장
 */
const write = (users: StoredUserType[]) => {
    writeFileSync('database/users.json', JSON.stringify(users));
};


/** 
 * email의 유저 불러오기
 */

const find = ({ email, id }: { email?: string, id?: string }) => {
    const users = getList();
    return users.find(user => user.email === email || user.id === id);
}

export default { getList, existEmail, write, find }



