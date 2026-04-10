const PI = Math.PI
const AXIS = 6378245.0
const OFFSET = 0.006693421622965943
const X_PI = (PI * 3000.0) / 180.0

export const COORDINATE_SYSTEMS = [
  { value: 'WGS84', label: 'WGS84' },
  { value: 'GCJ02', label: 'GCJ02' },
  { value: 'BD09', label: 'BD09' }
]

function transformLat(x, y) {
  let result =
    -100.0 +
    2.0 * x +
    3.0 * y +
    0.2 * y * y +
    0.1 * x * y +
    0.2 * Math.sqrt(Math.abs(x))

  result +=
    ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0
  result +=
    ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0
  result +=
    ((160.0 * Math.sin((y / 12.0) * PI) + 320.0 * Math.sin((y * PI) / 30.0)) * 2.0) /
    3.0

  return result
}

function transformLng(x, y) {
  let result =
    300.0 +
    x +
    2.0 * y +
    0.1 * x * x +
    0.1 * x * y +
    0.1 * Math.sqrt(Math.abs(x))

  result +=
    ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0
  result +=
    ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0
  result +=
    ((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) * 2.0) /
    3.0

  return result
}

export function outOfChina(lng, lat) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271
}

export function wgs84ToGcj02(lng, lat) {
  if (outOfChina(lng, lat)) {
    return { lng, lat }
  }

  let dLat = transformLat(lng - 105.0, lat - 35.0)
  let dLng = transformLng(lng - 105.0, lat - 35.0)
  const radLat = (lat / 180.0) * PI
  let magic = Math.sin(radLat)

  magic = 1 - OFFSET * magic * magic
  const sqrtMagic = Math.sqrt(magic)

  dLat = (dLat * 180.0) / (((AXIS * (1 - OFFSET)) / (magic * sqrtMagic)) * PI)
  dLng = (dLng * 180.0) / ((AXIS / sqrtMagic) * Math.cos(radLat) * PI)

  return {
    lng: lng + dLng,
    lat: lat + dLat
  }
}

export function gcj02ToWgs84(lng, lat) {
  if (outOfChina(lng, lat)) {
    return { lng, lat }
  }

  const converted = wgs84ToGcj02(lng, lat)

  return {
    lng: lng * 2 - converted.lng,
    lat: lat * 2 - converted.lat
  }
}

export function gcj02ToBd09(lng, lat) {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * X_PI)
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * X_PI)

  return {
    lng: z * Math.cos(theta) + 0.0065,
    lat: z * Math.sin(theta) + 0.006
  }
}

export function bd09ToGcj02(lng, lat) {
  const x = lng - 0.0065
  const y = lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)

  return {
    lng: z * Math.cos(theta),
    lat: z * Math.sin(theta)
  }
}

export function formatCoordinate(coord, digits = 6) {
  return {
    lng: Number(coord.lng.toFixed(digits)),
    lat: Number(coord.lat.toFixed(digits))
  }
}

export function convertCoordinate({ lng, lat, source }) {
  let wgs84
  let gcj02
  let bd09

  if (source === 'WGS84') {
    wgs84 = { lng, lat }
    gcj02 = wgs84ToGcj02(lng, lat)
    bd09 = gcj02ToBd09(gcj02.lng, gcj02.lat)
  } else if (source === 'GCJ02') {
    gcj02 = { lng, lat }
    wgs84 = gcj02ToWgs84(lng, lat)
    bd09 = gcj02ToBd09(lng, lat)
  } else {
    bd09 = { lng, lat }
    gcj02 = bd09ToGcj02(lng, lat)
    wgs84 = gcj02ToWgs84(gcj02.lng, gcj02.lat)
  }

  return {
    outsideChina: outOfChina(wgs84.lng, wgs84.lat),
    systems: {
      WGS84: formatCoordinate(wgs84),
      GCJ02: formatCoordinate(gcj02),
      BD09: formatCoordinate(bd09)
    }
  }
}
