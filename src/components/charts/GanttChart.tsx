"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

export interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress?: number; // 0-100
  status?: string;
  category?: string;
  owner?: string;
}

interface GanttChartProps {
  tasks: GanttTask[];
  title?: string;
  height?: number;
  className?: string;
  onTaskClick?: (task: GanttTask) => void;
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function GanttChart({
  tasks,
  title,
  height = 400,
  className,
  onTaskClick,
}: GanttChartProps) {
  // Process data for Recharts
  // We need [start time, duration] structure for stacked bars
  // X axis will be time (numeric timestamp)
  
  const minDate = new Date(Math.min(...tasks.map(t => t.start.getTime())));
  const maxDate = new Date(Math.max(...tasks.map(t => t.end.getTime())));
  
  // Add some buffer
  minDate.setMonth(minDate.getMonth() - 1);
  maxDate.setMonth(maxDate.getMonth() + 1);

  const data = tasks.map(task => {
    const startTs = task.start.getTime();
    const endTs = task.end.getTime();
    const duration = endTs - startTs;
    
    // We normalize the start time relative to minDate for the "placeholder" bar
    // Or we can just use the timestamp directly if axis is configured right
    
    return {
      ...task,
      startTs,
      endTs,
      duration,
      // For display
      startDateStr: task.start.toLocaleDateString(),
      endDateStr: task.end.toLocaleDateString(),
      // Placeholder bar (transparent) is the start time
      // But standard stacked bars stack values. 
      // If we use [start, end] range bar (new in recharts 2.x), that's better.
      // Let's assume typical stacked bar approach for compatibility:
      // [placeholder (start - min), duration]
      offset: startTs - minDate.getTime(),
      durationMs: duration,
    };
  }).sort((a, b) => a.startTs - b.startTs);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[1]?.payload || payload[0]?.payload; // payload[1] is the visible bar
      return (
        <div className="bg-popover border border-border rounded-md shadow-md p-2 text-sm">
          <p className="font-semibold">{data.name}</p>
          <p className="text-muted-foreground">
            Start: {data.startDateStr}
          </p>
          <p className="text-muted-foreground">
            End: {data.endDateStr}
          </p>
          {data.status && (
            <p className="text-xs mt-1">Status: {data.status}</p>
          )}
          {data.progress !== undefined && (
            <p className="text-xs">Progress: {data.progress}%</p>
          )}
        </div>
      );
    }
    return null;
  };

  const formatXAxis = (tick: number) => {
    const date = new Date(tick + minDate.getTime());
    return date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
  };

  return (
    <div className={cn("w-full", className)}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={Math.max(height, tasks.length * 40 + 60)}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 100 }} // Left margin for Y-axis labels
          barSize={20}
          onClick={(state) => {
            if (state && state.activePayload && state.activePayload[0]) {
              onTaskClick?.(state.activePayload[0].payload);
            }
          }}
          style={{ cursor: onTaskClick ? "pointer" : "default" }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
          <XAxis 
            type="number" 
            domain={[0, maxDate.getTime() - minDate.getTime()]} 
            tickFormatter={formatXAxis}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={90}
            tick={{ fill: "var(--color-foreground)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-muted)', opacity: 0.1 }} />
          
          {/* Invisible bar for offset */}
          <Bar dataKey="offset" stackId="a" fill="transparent" />
          
          {/* Visible bar for duration */}
          <Bar dataKey="durationMs" stackId="a" fill="var(--color-primary)" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => {
              // Cycle colors or use status-based color
              let fill = COLORS[index % COLORS.length];
              if (entry.status === 'Completed' || entry.progress === 100) fill = "var(--color-success)";
              if (entry.status === 'Delayed') fill = "var(--color-destructive)";
              if (entry.status === 'In Progress') fill = "var(--color-primary)";
              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
