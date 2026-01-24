'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useField } from '@payloadcms/ui'
import { iconRegistry } from '@/icons/registry'

// Create a list of icon names for searching
const iconNames = Object.keys(iconRegistry)

type Props = {
  path: string
  label?: string
  required?: boolean
  description?: string
}

export const IconPicker: React.FC<Props> = ({ path, label, required, description }) => {
  const { value, setValue } = useField<string>({ path })
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    if (!search) return iconNames.slice(0, 100) // Show first 100 default
    const lowerSearch = search.toLowerCase()
    return iconNames.filter((name) => name.toLowerCase().includes(lowerSearch)).slice(0, 100) // Limit results for performance
  }, [search])

  const handleSelect = useCallback(
    (iconName: string) => {
      setValue(iconName)
      setIsOpen(false)
    },
    [setValue],
  )

  const SelectedIcon = value && iconRegistry[value] ? iconRegistry[value] : null

  return (
    <div className="field-type text">
      <div style={{ marginBottom: '10px' }}>
        <label className="field-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
        {description && (
          <div
            style={{
              color: '#9a9a9a',
              fontSize: '14px',
              marginBottom: '5px',
            }}
          >
            {description}
          </div>
        )}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: '12px',
              border: '1px solid var(--theme-elevation-400)',
              borderRadius: '4px',
              background: 'var(--theme-bg)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minHeight: '50px',
            }}
          >
            {SelectedIcon ? (
              <SelectedIcon size={24} />
            ) : (
              <span style={{ color: '#888' }}>Select an icon...</span>
            )}
            {value && (
              <span style={{ marginLeft: 'auto', fontSize: '12px', opacity: 0.7 }}>{value}</span>
            )}
          </div>

          {isOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                maxHeight: '300px',
                overflowY: 'auto',
                background: 'var(--theme-bg)',
                border: '1px solid var(--theme-elevation-400)',
                borderTop: 'none',
                zIndex: 100,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                borderRadius: '0 0 4px 4px',
                padding: '10px',
              }}
            >
              <input
                type="text"
                placeholder="Search icons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '10px',
                  border: '1px solid var(--theme-elevation-400)',
                  borderRadius: '4px',
                  background: 'var(--theme-input-bg)',
                  display: 'block', // payload reset
                }}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
                  gap: '8px',
                }}
              >
                {filteredIcons.map((name) => {
                  const Icon = iconRegistry[name]
                  return (
                    <div
                      key={name}
                      onClick={() => handleSelect(name)}
                      title={name}
                      style={{
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '4px',
                        border:
                          value === name
                            ? '1px solid var(--theme-success-500)'
                            : '1px solid transparent',
                        background: value === name ? 'var(--theme-success-100)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--theme-elevation-100)'
                      }}
                      onMouseLeave={(e) => {
                        if (value !== name) e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <Icon size={20} />
                    </div>
                  )
                })}
              </div>
              {filteredIcons.length === 0 && (
                <div style={{ textAlign: 'center', padding: '10px', color: '#888' }}>
                  No icons found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
