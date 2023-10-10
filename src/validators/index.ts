import joi from 'joi';
import { IConfigProxy, IJoiError } from '../services/types';

const joiError = ({ msg = 'Code Error => ', code }: IJoiError) => () => `${msg} ${code}`;

const validateConfigProxy = (config: IConfigProxy) => {
    const schema = joi.object<IConfigProxy>({
        proxy: joi.string().pattern(/^(([1-9][0-9]{2}|[1-9][0-9]|[1-9])\.([1-9][0-9]|[1-9][0-9]{2}|[0-9]))\.([0-9]|[1-9][0-9]|[1-9][0-9]{2})\.([0-9]|[1-9][0-9]|[1-9][0-9]{2})\:([1-9][0-9]{4}|[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])$/).required(),
        proxyType: joi.string().pattern(/^(socks(4|5)|https|http)$/).required(),
        timeout: joi.number().integer().min(1).required(),
        url: joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/).optional(),
    });
    return schema.validate(config, { abortEarly: false });
};

const validateIp = (ip: string) => joi.string().ip({ cidr: 'forbidden', version: 'ipv4' }).validate(ip);
export {
    validateConfigProxy,
    IConfigProxy,
    validateIp,
};


// const result = validateIp('178.33163');
// console.log(result.error?.details[0].message);
// const test = () => {
    
//     const { error, value } = validateConfigProxy({
//         proxy: '178.33.3.163:8080',
//         proxyType: 'http',
//         timeout: 1,
//     });
//     if(error) {
//         const errors = error.details.map(({ context }) => `key Error => ${context?.key}`)
//         console.log(errors);
//     }
//     console.log(value);

// };

// test();