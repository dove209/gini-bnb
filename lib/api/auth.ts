import axios from ".";
import { UserType, LoginAPIBody, SignUpAPIBody} from '../../types/user'

//** 회원가입 API */
export const signupAPI = async (body: SignUpAPIBody): Promise<UserType> => {
    const { data } = await axios.post('/api/auth/signup', body);
    return data;
}

export const loginAPI = async (body: LoginAPIBody): Promise<UserType> => {
    const { data } = await axios.post('/api/auth/login', body);
    return data;
}