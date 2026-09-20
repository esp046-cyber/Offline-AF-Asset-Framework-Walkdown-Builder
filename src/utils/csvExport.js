const COLUMNS = [
  'Parent',
  'Name',
  'Template',
  'Manufacturer',
  'SerialNumber',
  'PLCTagPrefix'
]

function escapeCsvField(value) {
  const str = String(value ?? '')
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function findName(assets, id) {
  const node = assets.find((a) => a.id === id)
  return node ? node.name : ''
}

export function exportToPiBuilderCsv(assets, filename = 'af_walkdown_export.csv') {
  const rows = assets.map((asset) => {
    const parentName = asset.parentId ? findName(assets, asset.parentId) : ''
    return [
      parentName,
      asset.name,
      asset.template,
      asset.manufacturer,
      asset.serialNumber,
      asset.plcTagPrefix
    ]
      .map(escapeCsvField)
      .join(',')
  })

  const csvContent = [COLUMNS.join(','), ...rows].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
