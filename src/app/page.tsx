import Image from 'next/image'
import Prompt from '@/components/Prompt'
export default function Home() {
  return (
    <div className="w-full">
      <h1 className="text-center text-5xl">Chat GPT playground</h1>
      <Prompt />
    </div>
  )
}
