export const ENCRYPTIONS = ['WPA', 'WEP', 'nopass'] as const
export type Encryption = typeof ENCRYPTIONS[number]

export const wifiDefaults = {
    ssid: '',
    password: '',
    encryption: 'WPA' as Encryption,
    hidden: false,
}

export type WifiValues = typeof wifiDefaults

function escapeWifi(value: string): string {
    return value.replace(/([\\;,":])/g, '\\$1')
}

export function serializeWifi({ ssid, password, encryption, hidden }: WifiValues): string {
    const secret = encryption === 'nopass' ? '' : escapeWifi(password)
    return `WIFI:T:${encryption};S:${escapeWifi(ssid)};P:${secret};H:${hidden};;`
}

export const geoDefaults = { latitude: '', longitude: '' }
export type GeoValues = typeof geoDefaults

export function isValidGeo({ latitude, longitude }: GeoValues): boolean {
    return [latitude, longitude].every(v => v.trim() !== '' && !Number.isNaN(Number(v)))
}

export function serializeGeo({ latitude, longitude }: GeoValues): string {
    return `geo:${Number(latitude)},${Number(longitude)}`
}
