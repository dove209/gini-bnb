/* eslint-disable import/no-anonymous-default-export */
import { readFileSync, writeFileSync } from "fs";
import { StoredReservation } from '../../types/reservation';

// 예약 리스트 데이터 불러오기
const getList = () => {
    const reservationsBuffer = readFileSync('database/reservations.json');
    const reservationString = reservationsBuffer.toString();
    if (!reservationString) {
        return [];
    }
    const reservations: StoredReservation[] = JSON.parse(reservationString);
    return reservations;
}

// userId의 예약 리스트 불러오기
const getMyList = (userId: string) => {
    const reservations = getList();
    return reservations.filter((room) => room.userId === userId);
}

// id의 예약이 있는지 확인하기
const exist = (reservationId: string) => {
    const reservations = getList();
    return reservations.some((room) => room.id === reservationId);
}

// id의 예약 불러오기
const find = (reservationId: string) => {
    const reservations = getList();
    return reservations.find((room) => room.id === reservationId);
}

// 예약 리스트 저장하기
const write = (reservations: StoredReservation[]) => {
    writeFileSync('database/reservations.json', JSON.stringify(reservations));
};

export default { getList, getMyList, exist, find, write };