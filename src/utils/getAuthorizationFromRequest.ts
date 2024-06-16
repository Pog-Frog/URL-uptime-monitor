const getAuthorization = (req: { cookies: { [x: string]: any; }; headers: { [x: string]: any; }; }) => {
    const cookies = req.cookies['Authorization'];
    if (cookies) return cookies;

    const headers = req.headers['authorization'];
    if (headers) return headers.split('Bearer ')[1];

    return null;
}

export default getAuthorization;