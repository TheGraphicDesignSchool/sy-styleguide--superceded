import { fromJS, Map } from 'immutable'

// Receives an immutable map of a schema, then assigns the nested values to the keys.
export const formSchemaToKeyVal = schema => fromJS(schema).flatMap((value, key) => Map({ [key]: value.get('value') }))
