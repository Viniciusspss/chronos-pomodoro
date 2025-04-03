import './styles/theme.css'
import './styles/global.css'
import { Heading } from './components/Heading'
import { Timer } from 'lucide-react'

export function App() {

  return (
    <Heading>Hello World 
      <button>
        <Timer/>
        </button>
    </Heading>
  )
}

