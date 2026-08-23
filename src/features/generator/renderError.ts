import { RenderError } from '../../core/render'
import type { Params } from '../../core/params'

export function renderErrorMessage(error: unknown, params: Params): string {
    if (!(error instanceof RenderError)) {
        return 'Could not generate the code. Change a setting to try again.'
    }

    if (error.reason === 'capacity') {
        const size = error.capacity
            ? `Data needs ${error.capacity.needed} bytes, this code holds ${error.capacity.available}.`
            : 'The data is too long for this code.'

        return params.version
            ? `${size} Raise the version above ${params.version} or switch it to Auto.`
            : `${size} Shorten the data or lower the error correction below ${params.errorCorrection}.`
    }

    if (error.reason === 'empty') {
        return `Nothing came back as ${params.format.toUpperCase()}. Pick another format.`
    }

    return 'Could not generate the code. Change a setting to try again.'
}
