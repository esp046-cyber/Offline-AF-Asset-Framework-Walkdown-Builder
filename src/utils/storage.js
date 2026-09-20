import { useState, useEffect } from 'react'

const STORAGE_KEY = 'af_walkdown_data_v1'

export function loadAssets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultAssets()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length ? parsed : defaultAssets()
  } catch {
    return defaultAssets()
  }
}

export function saveAssets(assets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets))
  } catch (err) {
    console.error('Failed to persist walkdown data:', err)
  }
}

function defaultAssets() {
  return [
    {
      id: 'root',
      parentId: null,
      name: 'Plant',
      template: 'Plant',
      manufacturer: '',
      serialNumber: '',
      plcTagPrefix: ''
    }
  ]
}

export function useAssets() {
  const [assets, setAssets] = useState(loadAssets)

  useEffect(() => {
    saveAssets(assets)
  }, [assets])

  return [assets, setAssets]
}
