"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Ene",
    total: 4000,
    gastos: 2400,
  },
  {
    name: "Feb",
    total: 3000,
    gastos: 1398,
  },
  {
    name: "Mar",
    total: 2000,
    gastos: 9800,
  },
  {
    name: "Abr",
    total: 2780,
    gastos: 3908,
  },
  {
    name: "May",
    total: 1890,
    gastos: 4800,
  },
  {
    name: "Jun",
    total: 2390,
    gastos: 3800,
  },
  {
    name: "Jul",
    total: 3490,
    gastos: 4300,
  },
  {
    name: "Ago",
    total: 4000,
    gastos: 2400,
  },
  {
    name: "Sep",
    total: 3000,
    gastos: 1398,
  },
  {
    name: "Oct",
    total: 2000,
    gastos: 9800,
  },
  {
    name: "Nov",
    total: 2780,
    gastos: 3908,
  },
  {
    name: "Dic",
    total: 1890,
    gastos: 4800,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="gastos" fill="#ff8042" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

