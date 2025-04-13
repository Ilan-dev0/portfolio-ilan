import axios from 'axios';

export const GeoLocationService = {
  async getLocationFromIp(ip) {
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      return {
        ip: response.data.ip,
        city: response.data.city,
        region: response.data.region,
        country: response.data.country_name,
        latitude: response.data.latitude,
        longitude: response.data.longitude
      };
    } catch (error) {
      console.error('Erro ao obter localização do IP:', error.message);
      return {
        ip: ip,
        city: 'Desconhecida',
        region: 'Desconhecida',
        country: 'Desconhecido',
        latitude: null,
        longitude: null
      };
    }
  }
};