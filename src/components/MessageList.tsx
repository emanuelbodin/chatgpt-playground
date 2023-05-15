import Message from './Message'
import { type ChatMessage } from '@/types'

type MessageListProps = {
  messages: ChatMessage[]
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <>
      {messages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          text={message.text}
          meAuthor={message.meAuthor}
          timeStamp={message.timeStamp}
        />
      ))}
    </>
  )
}
export default MessageList
