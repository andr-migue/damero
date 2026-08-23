import type { QRType } from '../types'
import { WifiForm } from './WifiForm'

export const wifiType: QRType = {
    id: 'wifi',
    label: 'Wi-Fi',
    category: 'utility',
    icon: 'wifi',
    Form: WifiForm,
}
