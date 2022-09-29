export type LoginAPIBody = {
    email: string;
    password: string;
};

export type SignUpAPIBody = {
    email: string;
    name: string;
    password: string;
    birthday: string;
};


// /data/users.json에 저장된 유저 타입
export type StoredUserType = {
    id: string;
    email: string;
    name: string;
    password: string;
    birthday: string;
    image: string;
}

export type UserType = Omit<StoredUserType, 'password'> // 'password만 제거한 타입'


