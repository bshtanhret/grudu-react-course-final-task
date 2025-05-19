import { User } from "@shared/types"

export const createAccount = async (userData: User) => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
