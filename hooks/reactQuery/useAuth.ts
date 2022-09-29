import { useMutation } from '@tanstack/react-query';
import { loginAPI, signupAPI } from '../../lib/api/auth';


/** [POST]: 회원 로그인 */
export const useLogin = () => {
    return useMutation(loginAPI)
}


/** [POST]: 회원 가입 */
export const useSignUp = () => {
    return useMutation(signupAPI)
}