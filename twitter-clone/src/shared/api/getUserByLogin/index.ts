export const getUserByLogin = async (login: string) => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/users/' + login, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
