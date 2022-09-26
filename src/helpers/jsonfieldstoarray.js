export default function jsonFieldsToArray(jsonObject) {
  let jsonFields = []

  for (var field in jsonObject) {
    jsonFields.push([field, jsonObject[field]])
  }

  return jsonFields
}
