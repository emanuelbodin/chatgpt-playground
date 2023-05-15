'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import { type ChatMessage } from '@/types'
import MessageList from './MessageList'
import Message from './Message'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  prompt: string
}
const formatter = Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'CET',
})

const mockMessages = [
  { text: 'hej', meAuthor: false, timeStamp: formatter.format(new Date()) },
  { text: 'heej', meAuthor: true, timeStamp: formatter.format(new Date()) },
]

const Prompt = () => {
  const [lastGeneratedMessage, setLastGeneratedMessage] = useState('')
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const generate: SubmitHandler<Inputs> = async (formData) => {
    try {
      const { prompt } = formData
      setError('')
      setLoading(true)
      setAllMessages((prev) => [
        {
          meAuthor: true,
          text: prompt,
          timeStamp: formatter.format(new Date()),
          id: crypto.randomUUID(),
        },
        ...prev,
      ])
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = response.body
      if (!data) {
        return
      }
      const reader = data.getReader()
      const decoder = new TextDecoder()
      let done = false
      let message = ''
      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        message += chunkValue
        setLastGeneratedMessage(message)
      }
      setLastGeneratedMessage('')
      setAllMessages((prev) => [
        {
          meAuthor: false,
          text: message,
          timeStamp: formatter.format(new Date()),
          id: crypto.randomUUID(),
        },
        ...prev,
      ])
    } catch (error) {
      console.error(error)
      if (error.message) setError(error.message)
    }
    setLoading(false)
  }

  const messages = [...allMessages]

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <div className="w-full lg:w-1/3 my-4 flex flex-col items-center">
        <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit(generate)}>
          <textarea
            rows={4}
            className={`textarea textarea-bordered w-full ${error && 'textarea-error'}`}
            placeholder="Enter text..."
            {...register('prompt')}
          />
          <Button type="submit" title="Send" isLoading={loading} />
        </form>
      </div>

      {error && <div className={`mt-10 ${error && 'text-error'}`}>{error}</div>}
      {lastGeneratedMessage.length ? (
        <Message
          id={crypto.randomUUID()}
          meAuthor={false}
          text={lastGeneratedMessage}
          timeStamp={formatter.format(new Date())}
        />
      ) : null}
      <MessageList messages={messages} />
    </div>
  )
}

export default Prompt
