# shadcn/ui Components

A comprehensive set of shadcn/ui components built on Radix UI primitives for building complex admin UIs.

## Component Categories

### Core Form Components
- **Button** - Button with multiple variants and sizes
- **Input** - Text input field
- **Label** - Form label
- **Textarea** - Multi-line text input
- **Checkbox** - Checkbox input
- **RadioGroup** - Radio button group
- **Switch** - Toggle switch
- **Select** - Dropdown select

### Data Table Components
- **Table** - Basic table structure
- **DataTable** - Advanced data table with sorting, filtering, and pagination

### Dropdown & Selection Components
- **DropdownMenu** - Context menu dropdown
- **Combobox** - Searchable select dropdown
- **MultiSelect** - Multi-select with badges

### Dialog & Overlay Components
- **Dialog** - Modal dialog
- **Sheet** - Slide-out panel (left/right/top/bottom)
- **Popover** - Popover tooltip
- **Tooltip** - Tooltip component
- **AlertDialog** - Confirmation dialog

### Navigation Components
- **Tabs** - Tab navigation
- **Breadcrumb** - Breadcrumb navigation
- **NavigationMenu** - Complex navigation menu

### Date/Time Components
- **Calendar** - Calendar picker
- **DatePicker** - Single date picker
- **DateRangePicker** - Date range picker

### Feedback Components
- **Toast** - Toast notifications (use with `useToast` hook and `<Toaster />`)
- **Alert** - Alert message
- **Skeleton** - Loading skeleton
- **Progress** - Progress bar

### Utility Components
- **Card** - Card container
- **Badge** - Badge/tag component
- **Separator** - Visual separator
- **Avatar** - Avatar image/initials
- **ScrollArea** - Custom scrollable area

### Advanced Components
- **Command** - Command palette/search
- **Toggle** - Toggle button
- **ToggleGroup** - Group of toggle buttons
- **Slider** - Range slider
- **Menubar** - Menu bar component

## Usage Examples

### Basic Form
```tsx
import { Input, Label, Button } from "@/components/ui"

export function MyForm() {
  return (
    <form>
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter name" />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

### Data Table
```tsx
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<YourDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // ... more columns
]

export function MyTable({ data }: { data: YourDataType[] }) {
  return <DataTable columns={columns} data={data} searchKey="name" />
}
```

### Dialog
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui"

export function MyDialog() {
  const [open, setOpen] = useState(false)
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  )
}
```

### Toast Notifications
```tsx
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// In your component
function MyComponent() {
  const { toast } = useToast()
  
  return (
    <>
      <Button onClick={() => {
        toast({
          title: "Success",
          description: "Operation completed",
        })
      }}>
        Show Toast
      </Button>
      <Toaster />
    </>
  )
}

// In your layout.tsx
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

### Date Picker
```tsx
import { DatePicker } from "@/components/ui/date-picker"

export function MyForm() {
  const [date, setDate] = useState<Date>()
  
  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      placeholder="Select a date"
    />
  )
}
```

### Multi-Select
```tsx
import { MultiSelect } from "@/components/ui/multi-select"

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
]

export function MyForm() {
  const [selected, setSelected] = useState<string[]>([])
  
  return (
    <MultiSelect
      options={options}
      selected={selected}
      onChange={setSelected}
      placeholder="Select items..."
    />
  )
}
```

## Styling

All components use Tailwind CSS and follow the design system defined in `globals.css`. The components are fully customizable through className props and support dark mode.

## Dependencies

All components are built on:
- **Radix UI** - Accessible, unstyled UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - Component variant management
- **lucide-react** - Icon library

## Notes

- All components are client components (use "use client" directive)
- Components follow accessibility best practices via Radix UI
- TypeScript types are fully supported
- Components are composable and can be extended as needed


