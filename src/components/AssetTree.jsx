import React, { useState } from 'react'
import { ChevronRight, ChevronDown, Plus, Trash2, Copy, Wrench } from 'lucide-react'

export default function AssetTree({ assets, onAddChild, onDelete, onDuplicate }) {
  const roots = assets.filter((a) => a.parentId === null)

  return (
    <div className="space-y-2">
      {roots.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          assets={assets}
          depth={0}
          onAddChild={onAddChild}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  )
}

function TreeNode({ node, assets, depth, onAddChild, onDelete, onDuplicate }) {
  const [expanded, setExpanded] = useState(true)
  const children = assets.filter((a) => a.parentId === node.id)
  const hasChildren = children.length > 0
  const isRoot = node.parentId === null

  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-xl bg-graphite-800 border border-graphite-600 px-2 py-2"
        style={{ marginLeft: depth * 16 }}
      >
        <button
          onClick={() => setExpanded((e) => !e)}
          className="min-h-touch min-w-[44px] flex items-center justify-center shrink-0 disabled:opacity-30"
          disabled={!hasChildren}
        >
          {hasChildren ? (
            expanded ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />
          ) : (
            <span className="w-5" />
          )}
        </button>

        <Wrench size={18} className="text-signal-amber shrink-0" />

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-100 truncate">{node.name}</p>
          <p className="text-xs text-slate-400 truncate">
            {node.template}
            {node.manufacturer ? ` · ${node.manufacturer}` : ''}
            {node.plcTagPrefix ? ` · ${node.plcTagPrefix}` : ''}
          </p>
        </div>

        <button
          onClick={() => onAddChild(node)}
          className="min-h-touch min-w-[44px] flex items-center justify-center rounded-lg bg-signal-green/20 active:bg-signal-green/40 shrink-0"
          aria-label={`Add child to ${node.name}`}
        >
          <Plus size={20} className="text-signal-green" />
        </button>

        {!isRoot && (
          <button
            onClick={() => onDuplicate(node)}
            className="min-h-touch min-w-[44px] flex items-center justify-center rounded-lg bg-signal-blue/20 active:bg-signal-blue/40 shrink-0"
            aria-label={`Duplicate ${node.name}`}
          >
            <Copy size={20} className="text-signal-blue" />
          </button>
        )}

        {!isRoot && (
          <button
            onClick={() => onDelete(node.id)}
            className="min-h-touch min-w-[44px] flex items-center justify-center rounded-lg bg-signal-red/20 active:bg-signal-red/40 shrink-0"
            aria-label={`Delete ${node.name}`}
          >
            <Trash2 size={20} className="text-signal-red" />
          </button>
        )}
      </div>

      {expanded && hasChildren && (
        <div className="mt-2 space-y-2 border-l-2 border-graphite-700 ml-5">
          {children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              assets={assets}
              depth={depth + 1}
              onAddChild={onAddChild}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          ))}
        </div>
      )}
    </div>
  )
}
