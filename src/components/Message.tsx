import { type ChatMessage } from '@/types'

type MessageProps = ChatMessage & {}

const Message = ({ id, text, timeStamp, meAuthor }: MessageProps) => {
  return (
    <div className={`chat ${meAuthor ? 'chat-end' : 'chat-start'} w-1/2`}>
      <div className="chat-header">
        <time className="text-xs opacity-50">{timeStamp}</time>
      </div>
      <div
        className={`chat-bubble ${meAuthor ? 'chat-bubble-warning' : 'chat-bubble-accent'} mb-4`}>
        {text}
      </div>
    </div>
  )
}

export default Message
