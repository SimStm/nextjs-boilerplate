import markdownit from 'markdown-it'
import React from 'react'

export const MarkDownText = ({ text }: { text: string }) => {
  if (!text) { return <></> }
  const md = markdownit({ html: true })
  return <div dangerouslySetInnerHTML={{ __html: md.render(text) }} />
}