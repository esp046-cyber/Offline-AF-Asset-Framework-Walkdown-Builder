import React, { useState } from 'react'
import { X } from 'lucide-react'

const TEMPLATES = [
  'Unit', 'Pump', 'Valve', 'Motor', 'Tank',
  'Sensor', 'PLC', 'Instrument', 'Generic Asset'
]

export default function AssetForm({ parentName, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    template: TEMPLATES[0],
    manufacturer: '',
    serialNumber: '',
    plcTagPrefix: ''
  })

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
              onChange={update('name')}
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
            />
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
              onChange={update('plcTagPrefix')}
              placeholder="e.g. PLC1.P101"
              className="input"
            />
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
