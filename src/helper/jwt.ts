import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export function generateAccessToken(username: object) {
    return jwt.sign(username, TOKEN_SECRET, {});
}

export function getToken(token: string | undefined){
    return new Promise<UsuarioLoginObject | undefined>((resolver) => {
        jwt.verify(token || "", TOKEN_SECRET, (err: any, user: any) => {
            if (err) {
                console.log(err)
                resolver(undefined)
            }
            resolver(user as UsuarioLoginObject)
        })
    })
}