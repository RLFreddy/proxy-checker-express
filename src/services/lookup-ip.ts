import { open, CityResponse, validate } from 'maxmind';
import { join } from 'path';
// import { validateIp } from '../validators';

const main = async (ip: string) => {
    
    // const { error } = validateIp(ip);
    // if(error) return 'Error ipv4 not valid!';
    // if(!validate(ip)) return 'Error ip not valid!';

    const lookup = await open<CityResponse>(join(__dirname, '..', 'data', 'GeoLite2-City.mmdb'));
    const result = lookup.get(ip);
    return result;
};

export default main;