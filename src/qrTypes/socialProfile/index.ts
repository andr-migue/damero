import type { QRType } from '../types'
import { SocialProfileForm } from './SocialProfileForm'

export const socialProfileType: QRType = {
    id: 'social-profile',
    label: 'Social profile',
    category: 'social',
    icon: 'user-round',
    Form: SocialProfileForm,
}
