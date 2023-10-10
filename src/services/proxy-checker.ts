import axios, { AxiosRequestConfig, AxiosProxyConfig } from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
// import { validateConfigProxy } from '../validators';
import { IConfigProxy, IResultProxy } from './types';

const main = async (configProxy: IConfigProxy) => {
    
    // const { error } = validateConfigProxy(configProxy);
    // if(error) {
    //     const errors = error.details.map(({ context }) => `key Error => ${context?.key}`)
    //     return errors;
    // };
    
    let { url, proxy, proxyType, timeout } = configProxy;
    url = url || 'https://ipv4.icanhazip.com/';
    const isUrlHttps = url.startsWith('https')? true: false;

    // get agent proxy
    const getAgent = () => {
        const [ host, port ] = proxy.split(':');
        if(['socks4', 'socks5'].includes(proxyType)) {
            const agent = new SocksProxyAgent(`${proxyType}://${host}:${port}`);
            agent.timeout = timeout;
            return {
                url,
                [isUrlHttps? 'httpsAgent': 'httpAgent']: agent
            };
        }
        const agent: AxiosProxyConfig = {
            host,
            port: +port,
            protocol: proxyType
        };
        return {
            url,
            proxy: agent
        };
    };
    //set proxy
    const config: AxiosRequestConfig = {
        method: 'GET',
        ...getAgent(),
        timeout,
    };
    
    const result: IResultProxy = {
        url,
        proxy,
        proxyType,
        success: false,
        timeout: 0
    };

    const ti = Date.now();
    try {
        const data = (await axios(config)).data.trim();
        result.success = true;
        result.ipResponse = data;
    } catch (err) {
        result.success = false;
        result.messageError = (err as Error).message;
    } finally {
        const tt = Date.now() - ti;
        result.timeout = tt;
    }
    return result;
};
export default main;
// main({
//     url: 'https://ipv4.icanhazip.com/',
//     proxy: '67.207.89.36:59166',
//     proxyType: 'socks5',
//     timeout: 20_000,
// })
// .then(console.log)
// .catch(console.log);