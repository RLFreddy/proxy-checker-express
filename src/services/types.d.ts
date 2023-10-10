interface IJoiError {
    msg?: string;
    code: string | number;
}

interface IConfigProxy {
    url?: string;
    proxy: string;
    proxyType: 'socks4' | 'socks5' | 'https' | 'http';
    timeout: number;
}

interface IResultProxy extends Required<IConfigProxy> {
    success: boolean;
    messageError?: string;
    ipResponse?: string;
}

export {
    IConfigProxy,
    IResultProxy,
    IJoiError,
};