import { useEffect } from 'react'

interface Props {
  trigger: string
}

export function ScrollToTop({ trigger }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [trigger])

  return null
}
