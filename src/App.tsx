import { Hero } from './components/Hero'
import { Steps } from './components/Steps'
import { ParticipationForm } from './components/ParticipationForm'
import { ProgressBar } from './components/ProgressBar'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Hero />
      <Steps />
      <ParticipationForm />
      <ProgressBar />
      <Footer />
    </div>
  )
}
