import React, { useState, useMemo } from 'react'
import { Download, HardHat, Trash } from 'lucide-react'
import AssetTree from './components/AssetTree.jsx'
import AssetForm from './components/AssetForm.jsx'
import { useAssets } from './utils/storage.js'
import { exportToPiBuilderCsv } from './utils/csvExport.js'

export default function App() {
  const [assets, setAssets] = useAssets()
  const [formTarget, setFormTarget] = useState(null)

  // Sticky memory: Template/Manufacturer carry forward to the next asset this session.
  const [lastUsed, setLastUsed] = useState({ template: null, manufacturer: null })

  const assetCount = assets.length - 1

  const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const handleSave = (formData) => {
    const newNode = { id: makeId(), parentId: formTarget.id, ...formData }
    setAssets((prev) => [...prev, newNode])
    setLastUsed({ template: formData.template, manufacturer: formData.manufacturer })
    setFormTarget(null)
  }

  const handleDuplicate = (node) => {
    const clone = { ...node, id: makeId(), name: `${node.name}-Copy` }
    setAssets((prev) => [...prev, clone])
  }

  const collectDescendants = (id, all) => {
    const toRemove = new Set([id])
    let changed = true
    while (changed) {
      changed = false
      for (const a of all) {
        if (toRemove.has(a.parentId) && !toRemove.has(a.id)) {
          toRemove.add(a.id)
          changed = true
        }
      }
    }
    return toRemove
  }

  const handleDelete = (id) => {
    setAssets((prev) => {
      const toRemove = collectDescendants(id, prev)
      return prev.filter((a) => !toRemove.has(a.id))
    })
  }

  const handleReset = () => {
    if (confirm('Clear the entire walkdown? This cannot be undone.')) {
      setAssets([
        { id: 'root', parentId: null, name: 'Plant', template: 'Plant', manufacturer: '', serialNumber: '', plcTagPrefix: '' }
      ])
    }
  }

  const handleExport = () => exportToPiBuilderCsv(assets)

  const parentName = useMemo(() => (formTarget ? formTarget.name : ''), [formTarget])

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom">
      <header className="sticky top-0 z-30 bg-graphite-900/95 backdrop-blur border-b border-graphite-700 px-4 py-3 safe-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardHat size={24} className="text-signal-amber" />
            <div>
              <h1 className="text-base font-bold text-slate-100 leading-tight">Offline AF Walkdown</h1>
              <p className="text-xs text-slate-400 leading-tight">{assetCount} asset{assetCount === 1 ? '' : 's'} mapped</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="touch-btn min-h-touch min-w-[44px] flex items-center justify-center rounded-lg bg-graphite-800 active:bg-graphite-700"
            aria-label="Reset walkdown"
          >
            <Trash size={20} className="text-slate-400" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        <AssetTree
          assets={assets}
          onAddChild={(node) => setFormTarget(node)}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-5 pt-3 bg-gradient-to-t from-graphite-950 via-graphite-950/95 to-transparent safe-bottom">
        <button
          onClick={handleExport}
          className="touch-btn w-full min-h-[64px] flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 text-graphite-950 font-extrabold text-lg shadow-lg shadow-emerald-500/20 active:opacity-85"
        >
          <Download size={26} />
          Export to PI Builder (CSV)
        </button>
      </footer>

      {formTarget && (
        <AssetForm
          parentName={parentName}
          initialTemplate={lastUsed.template}
          initialManufacturer={lastUsed.manufacturer}
          onSave={handleSave}
          onClose={() => setFormTarget(null)}
        />
      )}
    </div>
  )
}
