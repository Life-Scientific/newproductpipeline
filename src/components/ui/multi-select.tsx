"use client"

import * as React from "react"
import { X, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  maxCount?: number
  disabled?: boolean
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  className,
  maxCount = 3,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const triggerRef = React.useRef<HTMLDivElement>(null)

  const handleUnselect = (value: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    onChange(selected.filter((s) => s !== value))
  }

  const handleSelect = (value: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (selected.includes(value)) {
      handleUnselect(value)
    } else {
      onChange([...selected, value])
    }
    // Keep dropdown open for multiple selections
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (searchValue === "" && selected.length > 0) {
        handleUnselect(selected[selected.length - 1])
      }
    }
    if (e.key === "Escape") {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  const filteredOptions = options.filter((option) => {
    const matchesSearch = option.label.toLowerCase().includes(searchValue.toLowerCase())
    const isNotSelected = !selected.includes(option.value)
    return matchesSearch && isNotSelected
  })

  const selectedOptions = options.filter((option) => selected.includes(option.value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("relative w-full", className)}>
        <PopoverAnchor asChild>
          <div
            ref={triggerRef}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-expanded={open}
            className={cn(
              "min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer",
              disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={(e) => {
              if (!disabled) {
                e.preventDefault()
                setOpen(!open)
                if (!open) {
                  setTimeout(() => inputRef.current?.focus(), 0)
                }
              }
            }}
            onKeyDown={(e) => {
              if (!disabled && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault()
                setOpen(!open)
                if (!open) {
                  setTimeout(() => inputRef.current?.focus(), 0)
                }
              }
            }}
          >
            <div className="flex flex-wrap gap-1 items-center">
              {selectedOptions.map((option) => {
                return (
                  <Badge 
                    key={option.value} 
                    variant="secondary" 
                    className="mr-1 mb-1"
                  >
                    {option.label}
                    <span
                      role="button"
                      tabIndex={0}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer inline-flex items-center"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          e.stopPropagation()
                          handleUnselect(option.value, e)
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleUnselect(option.value, e)
                      }}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </span>
                  </Badge>
                )
              })}
              {selected.length === 0 && (
                <span className="text-muted-foreground ml-2">{placeholder}</span>
              )}
            </div>
          </div>
        </PopoverAnchor>
        {open && (
          <Input
            ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 opacity-0 pointer-events-none"
            tabIndex={-1}
          />
        )}
      </div>
      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] p-0" 
        align="start"
        onOpenAutoFocus={(e) => {
          e.preventDefault()
          inputRef.current?.focus()
        }}
      >
        <div className="p-2 border-b">
          <Input
            ref={inputRef}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-9"
            autoFocus
          />
        </div>
        <div className="max-h-60 overflow-auto p-1">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredOptions.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      isSelected && "bg-accent"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleSelect(option.value, e)
                      setSearchValue("")
                    }}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
