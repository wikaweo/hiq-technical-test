import { motion } from 'framer-motion'
import { useState } from 'react'

const menuItems = [
  { label: 'Start', icon: '🏠' },
  { label: 'Bearbeta fil', icon: '📁' },
  { label: 'Inställningar', icon: '⚙️' },
]

export default function Layout({ children }) {
  const [active, setActive] = useState('Bearbeta fil')

  return (
    <div className="min-h-screen flex bg-gray-50 font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 p-6 space-y-8 hidden md:block">
        <div className="text-2xl font-display text-hiq-purple">HiQ Tool</div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-left rounded-xl transition ${
                active === item.label
                  ? 'bg-hiq-purple text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
