import Image from 'next/image'

interface ButtonProps {
  onClick?: () => void
  title: string
  isLoading: boolean
  type: 'button' | 'submit'
}

const Button = ({ type = 'button', onClick, title, isLoading = false }: ButtonProps) => {
  return (
    <button
      className={`btn btn-outline btn-success px-12 ${isLoading && 'loading'}`}
      onClick={onClick}
      type={type}>
      {isLoading ? 'Loading...' : title}
    </button>
  )
}

export default Button
