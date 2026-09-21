import React, { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

// Strict dropdown — exact set requested, no free text.
const TEMPLATES = [
  'Pump', 'Valve', 'Motor', 'Tank', 'Sensor', 'PLC', 'Instrument', 'Generic'
]

// Combobox — tap-to-select common vendors, but free text is always allowed.
const MANUFACTURERS = [
  'Siemens', 'Rockwell Automation', 'Emerson', 'ABB',
  'Schneider Electric', 'Yokogawa', 'Honeywell', 'Grundfos', 'Endress+Hauser'
]

// "P-101" -> "PLC.P_101": uppercase, non-alphanumerics collapsed to underscores.
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
      // Auto-fill the tag only until the user has typed into that field themselves.
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
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Add Asset</h2>
            <p className="text-base text-slate-400">Parent: {parentName}</p>
          </div>
          <button
            onClick={onClose}
            className="touch-btn min-h-touch min-w-[56px] flex items-center justify-center rounded-xl bg-graphite-800 active:bg-graphite-700"
            aria-label="Close"
          >
            <X size={26} className="text-slate-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="relative">
              <select
                value={form.template}
                onChange={update('template')}
                className="input appearance-none pr-12"
              >
                {TEMPLATES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown
                size={22}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </Field>

          <Field label="Manufacturer">
            <input
              value={form.manufacturer}
              onChange={update('manufacturer')}
              placeholder="Tap to select or type"
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
              <p className="text-sm text-slate-500 mt-1.5">Auto-filled from asset name — tap to override.</p>
            )}
          </Field>

          <button
            type="submit"
            className="touch-btn w-full h-16 mt-2 rounded-xl bg-emerald-500 text-graphite-950 font-extrabold text-lg active:opacity-85"
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
      <span className="block text-base font-semibold text-slate-400 mb-2">{label}</span>
      {children}
    </label>
  )
}
