
import bcrypt from 'bcrypt'

export const comaparepassword = (password: string, userPassword: string) => {

    return bcrypt.compare(password, userPassword)
};