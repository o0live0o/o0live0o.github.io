import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './CodeBlock'
import docsList from './docsList.json'
import type { ReactNode } from 'react'

interface CodeBlockProps {
  children?: ReactNode
  className?: string
  inline?: boolean
}


export default function DocsViewer() {
  const [current, setCurrent] = useState(docsList[0])
  const [content, setContent] = useState('')

  const loadFile = async (file: typeof docsList[0]) => {
    try{
        setCurrent(file)
        const basePath =  window.location.origin
        const res = await fetch(`${basePath}${file.path}`)
        if (!res.ok) {
        throw new Error(`Failed to load file: ${res.statusText}`)
        }
        const text = await res.text()
    setContent(text)
    } catch (error) {
      console.error('Error loading file:', error)
    }
  }


  useEffect(() => {
    loadFile(current)
  }, [])

  return (
    <div className="docs-container">
      <aside className="docs-sidebar">
        <div className="sidebar-header">
          <h2>Note</h2>
        </div>
        <nav className="file-list">
          {docsList.map(f => (
            <div
              key={f.name}
              className={`file-item ${current.name === f.name ? 'active' : ''}`}
              onClick={() => loadFile(f)}
            >
              <span className="file-name">{f.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      <main className="docs-content">
        <div className="content-header">
          <h1>{current.name}</h1>
        </div>
        <div className="markdown-body">
          <ReactMarkdown
            components={{
              code: ({ className, inline, children, ...props }: CodeBlockProps) => {
                if (inline) {
                  return <code className={className} {...props}>{children}</code>
                }
                return (
                  <CodeBlock className={className}>
                    {String(children).replace(/\n$/, '')}
                  </CodeBlock>
                )
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  )
}