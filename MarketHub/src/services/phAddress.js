const BASE_URL = 'https://psgc.gitlab.io/api'

async function fetchJson(path) {
  const response = await fetch(`${BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error('Failed to load address data')
  }
  return response.json()
}

export function getRegions() {
  return fetchJson('/regions.json')
}

export function getProvincesByRegion(regionCode) {
  return fetchJson(`/regions/${regionCode}/provinces.json`)
}

export function getCitiesByProvince(provinceCode) {
  return fetchJson(`/provinces/${provinceCode}/cities-municipalities.json`)
}

export function getCitiesByRegion(regionCode) {
  return fetchJson(`/regions/${regionCode}/cities-municipalities.json`)
}

export function getBarangaysByCity(cityCode) {
  return fetchJson(`/cities-municipalities/${cityCode}/barangays.json`)
}

export function createEmptyAddressForm() {
  return {
    street: '',
    regionCode: '',
    region: '',
    provinceCode: '',
    province: '',
    cityCode: '',
    city: '',
    barangay: '',
    zipCode: '',
    skipProvince: false,
  }
}

export function formatAddress(form) {
  return [form.street, form.barangay, form.city, form.province, form.region, form.zipCode]
    .filter(Boolean)
    .join(', ')
}

export function getAddressFieldErrors(form) {
  return {
    street: form.street?.trim() ? '' : 'Address line is required',
    region: form.regionCode ? '' : 'Region is required',
    province: form.skipProvince || form.province ? '' : 'Province is required',
    city: form.cityCode ? '' : 'City is required',
    barangay: form.barangay ? '' : 'Barangay is required',
    zipCode: !form.zipCode
      ? 'Zip code is required'
      : form.zipCode.length === 4
        ? ''
        : 'Zip code must be 4 digits',
  }
}

export function isAddressFormComplete(form) {
  return Object.values(getAddressFieldErrors(form)).every((error) => !error)
}
