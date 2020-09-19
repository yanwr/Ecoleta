import { celebrate, Joi } from 'celebrate';

const points = {
    create: celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                user_id: Joi.number().required(),
                email: Joi.string().required().email(),
                image: Joi.string().required(),
                address_latitude: Joi.number().required(),
                address_longitude: Joi.number().required(),
                address_number: Joi.string().required(),
                address_city: Joi.string().required(),
                address_uf: Joi.string().required().max(2),
                itens: Joi.array().required().max(6)
            })
        }, 
        { abortEarly: false }
    ),
    show: celebrate(
        {
            params: Joi.object().keys({
                id: Joi.number().required()
            })
        }, 
        { abortEarly: false }
    ),
};

const users = {
    create: celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required(),
                password: Joi.string().required(),
            })
        }, 
        { abortEarly: false }
    ),
    show: celebrate(
        {
            params: Joi.object().keys({
                id: Joi.number().required()
            })
        }, 
        { abortEarly: false }
    ),
};

const pointsItens = {
    filter: celebrate(
        {
            query: Joi.object().keys({
                address_city: Joi.string().required(),
                address_uf: Joi.string().required(),
                itens: Joi.string().pattern(new RegExp(/[1-6]?,?[1-6]?,?[1-6]/)).required()
            })
        },
        { abortEarly: false }
    )
};

export default { points, users,pointsItens };