/* eslint-disable import/no-anonymous-default-export */
import { readFileSync, writeFileSync } from "fs";
import { StoredRoomType } from "../../types/room";

/**
 * 숙소 리스트 데이터 불러오기
 */
const getList = () => {
    const roomBuffer = readFileSync('data/rooms.json');
    const roomString = roomBuffer.toString();
    if (!roomString) {
        return [];
    }
    const rooms: StoredRoomType[] = JSON.parse(roomString);
    return rooms;
}

/**
 * id의 숙소가 있는지 확인
 */
const existId = (roomId: string) => {
    const rooms = getList();
    return rooms.some((room) => room.id === roomId);
};

/**
 * id의 숙소 불러오기
 */
const find = (roomId: string) => {
    const rooms = getList();
    return rooms.find((room) => room.id === roomId);
}

/**
 * 숙소 리스트 저장하기
 */
const write = (rooms: StoredRoomType[]) => {
    writeFileSync('data/rooms.json', JSON.stringify(rooms));
};

export default { getList, existId, find, write };