import models from '../models';
import bcrypt from 'bcryptjs'; //encriptar clave
import token from '../services/token';

export default {
    //req: argumento solicitud http a la funcion de middleware
    //res: argumento de respuesta http a la funcion de middleware
    //next: argumento de devolucion de llamada a la funcion de middleware
    registro: async (req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e)
        }
    },
    login: async (req, res, next) => {
        try {
            //se busca el email del usuario
            let user = await models.Usuario.findOne({ email: req.body.email });
            //si se encuentra
            if (user) {
                //comparamos la clave encriptada
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    //Si es correcta devolvemos el usuario y el token codificiado
                    let tokenReturn = await token.encode(user._id, user.email, user.nombre);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(404).send({
                        message: 'Password Incorrecto'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }
}