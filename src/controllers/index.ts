import { Request, Response } from 'express';
import serviceProxyChecker from '../services/proxy-checker';
import serviceLookupIp from '../services/lookup-ip';
import { IConfigProxy } from '../services/types';

const main = async (_: Request, res: Response) => {
    res.json({
        msg: 'Hello Friend!',
    });
};

const author = async (_: Request, res: Response) => {
    res.json({
        author: 'freddy',
    });
};

const proxyChecker = async (req: Request, res: Response) => {
    const payload = req.body as IConfigProxy;
    const response = await serviceProxyChecker(payload);
    const ipLookup = await serviceLookupIp(payload.proxy.split(':')[0])
    res.json({
        ...response,
        ipLookup
    });
};

export {
    main,
    author,
    proxyChecker,
};