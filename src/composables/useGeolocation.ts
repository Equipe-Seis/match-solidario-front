import { ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

type CityState = { city: string; state: string };

export default function useGeolocation() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function reverseGeocode(lat: number, lon: number): Promise<CityState | null> {
    const email = import.meta.env.VITE_NOMINATIM_EMAIL;
    const emailParam = email ? `&email=${encodeURIComponent(email)}` : '';
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1${emailParam}`;
      const res = await fetch(url, { headers: { 'accept-language': 'pt-BR,pt;q=0.9' } });
      if (!res.ok) throw new Error(`Nominatim ${res.status}`);
      const data = await res.json();
      const addr = data?.address || {};
      const city = addr.city || addr.town || addr.village || '';
      const state = addr.state || '';
      if (city && state) return { city, state };
    } catch (_) {
      // fallback abaixo
    }
    // Fallback: BigDataCloud (sem chave)
    const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`;
    const bdcRes = await fetch(bdcUrl);
    if (!bdcRes.ok) return null;
    const bdc = await bdcRes.json();
    const city = bdc.city || bdc.locality || bdc.localityInfo?.administrative?.find((x: any) => x.order === 6)?.name || '';
    const state = bdc.principalSubdivision || '';
    if (!city || !state) return null;
    return { city, state };
  }

  async function requestCityState(): Promise<CityState | null> {
    loading.value = true;
    error.value = null;
    try {
      await Geolocation.requestPermissions();
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
      const { latitude, longitude } = pos.coords;
      return await reverseGeocode(latitude, longitude);
    } catch (e: any) {
      error.value = e?.message || 'Falha ao obter localização';
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, requestCityState };
}
