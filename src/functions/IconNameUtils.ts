export function makeBuildingIconPart(buildingName: string) {
  return buildingName
    .replace(/^Flawless /, '')
    .replace(/^Holy /, '')
    .replace(/'/g, '')
    .replace(/ /g, '_');
}
export function makeResourceIconPart(resourceName: string) {
  return resourceName.replace(/ /g, '');
}
