import { Form, FormRow, TextField } from '../../../ui'
import { useFormState } from '../../../hooks/useFormState'
import { useIconLogo } from '../../../hooks/useIconLogo'
import { geoDefaults, isValidGeo, serializeGeo } from '../serializers/utility'
import type { QRFormProps } from '../types'

export function GeolocationForm({ icon, onSerialize, onLogo }: QRFormProps) {
    const [values, set] = useFormState(geoDefaults)
    useIconLogo(icon, onLogo)

    return (
        <Form
            onSubmit={() => onSerialize(serializeGeo(values))}
            disabled={!isValidGeo(values)}
        >
            <FormRow>
                <TextField
                    label="Latitude"
                    type="number"
                    step="any"
                    value={values.latitude}
                    onChange={v => set('latitude', v)}
                    placeholder="41.4036"
                />
                <TextField
                    label="Longitude"
                    type="number"
                    step="any"
                    value={values.longitude}
                    onChange={v => set('longitude', v)}
                    placeholder="2.1744"
                />
            </FormRow>
        </Form>
    )
}
