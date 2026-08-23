import type { QRType } from '../types'
import { GeolocationForm } from './GeolocationForm'

export const geolocationType: QRType = {
    id: 'geolocation',
    label: 'Geolocation',
    category: 'utility',
    icon: 'map-marker',
    Form: GeolocationForm,
}
