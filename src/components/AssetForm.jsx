import React, { useState } from 'react'
import { X } from 'lucide-react'

const TEMPLATES = [
  'Unit', 'Pump', 'Valve', 'Motor', 'Tank',
  'Sensor', 'PLC', 'Instrument', 'Generic Asset'
]

const MANUFACTURERS = [
  'Siemens', 'Rockwell Automation', 'Emerson', 'ABB',
  'Schneider Electric', 'Grundfos', 'Yokogawa', 'Honeywell'
]

// Turns "P-101" into "PLC.P_101" — strips anything that isn't A-Z/0-9,
// collapses it to underscores, and prefixes PLC.
function generateTagPrefix(name) {
  const sanitized = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
  return sanitized ? `PLC.${sanitized}` : ''
}

export default function AssetForm({ parentName, initialTemplate, initialManufacturer, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    template: initialTemplate || TEMPLATES[0],
    manufacturer: initialManufacturer || '',
    serialNumber: '',
    plcTagPrefix: ''
  })
  const [tagManuallyEdited, setTagManuallyEdited] = useState(false)

  const handleNameChange = (e) => {
    const value = e.target.value
    setForm((f) => ({
      ...f,
      name: value,
      // Only auto-fill the tag prefix if the user hasn't typed into that field themselves yet.
      plcTagPrefix: tagManuallyEdited ? f.plcTagPrefix : generateTagPrefix(value)
    }))
  }

  const handleTagChange = (e) => {
    setTagManuallyEdited(true)
    setForm((f) => ({ ...f, plcTagPrefix: e.target.value }))
  }

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 safe-bottom">
      <div className="w-full sm:max-w-md bg-graphite-900 border-t sm:border border-graphite-600 rounded-t-2xl sm:rounded-2xl p-5 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Add Asset</h2>
            <p className="text-sm text-slate-400">Parent: {parentName}</p>
          </div>
          <button
            onClick={onClose}
            className="min-h-touch min-w-[56px] flex items-center justify-center rounded-xl bg-graphite-800 active:bg-graphite-700"
            aria-label="Close"
          >
            <X size={24} className="text-slate-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Asset Name *">
            <input
              autoFocus
              value={form.name}
              onChange={handleNameChange}
              placeholder="e.g. P-101"
              className="input"
              required
            />
          </Field>

          <Field label="Template">
            <select value={form.template} onChange={update('template')} className="input">
              {TEMPLATES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Manufacturer">
            <input
              value={form.manufacturer}
              onChange={update('manufacturer')}
              placeholder="e.g. Grundfos"
              className="input"
              list="manufacturer-list"
              autoComplete="off"
            />
            <datalist id="manufacturer-list">
              {MANUFACTURERS.map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </Field>

          <Field label="Serial Number">
            <input
              value={form.serialNumber}
              onChange={update('serialNumber')}
              placeholder="e.g. SN-88213"
              className="input"
            />
          </Field>

          <Field label="PLC Tag Prefix">
            <input
              value={form.plcTagPrefix}
              onChange={handleTagChange}
              placeholder="e.g. PLC1.P101"
              className="input"
            />
            {!tagManuallyEdited && form.name && (
              <p className="text-xs text-slate-500 mt-1">Auto-filled from asset name — edit to override.</p>
            )}
          </Field>

          <button
            type="submit"
            className="w-full min-h-touch mt-2 rounded-xl bg-signal-blue text-graphite-950 font-bold text-base active:opacity-80"
          >
            Save Asset
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-400 mb-1.5">{label}</span>
      {children}
    </label>
  )
}
