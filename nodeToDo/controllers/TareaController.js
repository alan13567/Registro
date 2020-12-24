import models from '../models'

export default {
    //req: argumento solicitud http a la funcion de middleware
    //res: argumento de respuesta http a la funcion de middleware
    //next: argumento de devolucion de llamada a la funcion de middleware
    add: async (req, res, next) => {
        try {
            const reg = await models.Tarea.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e)
        }
    },
    query: async (req, res, next) => {
        try {
            const reg = await models.Tarea.find({ 'usuario': req.query.usuario }).exec();
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e)
        }
    },
    /*  remove: async (req, res, next) => {
         try {
             const reg = await models.Categoria.findByIdAndDelete({ _id: req.body._id });
             res.status(200).json(reg);
         } catch (e) {
             res.status(500).send({
                 message: 'Ocurrió un error'
             });
             next(e)
         }
     }, */
    terminada: async (req, res, next) => {
        try {
            const reg = await models.Tarea.findByIdAndUpdate({ _id: req.body._id }, { realizada: 1 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e)
        }
    },
    deshacer: async (req, res, next) => {
        try {
            const reg = await models.Tarea.findByIdAndUpdate({ _id: req.body._id }, { realizada: 0 });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e)
        }
    },
}