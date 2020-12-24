import jwt from 'jsonwebtoken';
import models from '../models';

async function checkToken(token) {
    let __id = null;
    try {
        const { _id } = await jwt.decode(token);
        __id = _id;
    } catch (e) {
        return false; //token no valido
    }

    const user = await models.Usuario.findOne({ _id: __id, estado: 1 });

    if (user) {
        const token = jwt.sign({ _id: __id }, 'clavesecretaToken', { expiresIn: '1d' });

        return { token, rol: user.rol };
    } else {
        return false;
    }
}

export default {

    encode: async (_id, email, nombre) => {
        const token = jwt.sign({ _id: _id, email: email, nombre: nombre }, 'clavesecretaToken', { expiresIn: '1d' });
        return token;
    },

    decode: async (token) => {
        try {
            const { _id } = await jwt.verify(token, 'clavesecretaToken');
            const user = await models.Usuario.findOne({ _id, estado: 1 });

            if (user) {
                return user;
            } else {
                return false;
            }

        } catch (e) {
            const newToken = await checkToken(token);

            return newToken;
        }
    }
}