import axios from ".";
import { UserType } from '../../types/user'

// 회원가입 body
interface SignUpAPIBody {
    email: string;
    name: string;
    password: string;
    birthday: string;
}

/** 회원가입 API */
export const signupAPI = (body: SignUpAPIBody) => {
    return axios.post<UserType>('/api/auth/signup', body);
}