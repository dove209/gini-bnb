import axios from ".";
import { UserType, LoginAPIBody, SignUpAPIBody} from '../../types/user'

//** 회원가입 API */
export const signupAPI = (body: SignUpAPIBody): Promise<UserType> => {
    return axios.post('/api/auth/signup', body);
}

export const loginAPI = (body: LoginAPIBody): Promise<UserType> => {
    return axios.post('/api/auth/login', body)
}