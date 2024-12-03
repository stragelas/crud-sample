'use client'

import { useState } from 'react'
import { addText, updateText, deleteText } from '../actions'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TextList({ initialTexts }: { initialTexts: any[] }) {
  const [texts, setTexts] = useState(initialTexts)
  const [newText, setNewText] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newText.trim()) {
      const addedText = await addText(newText)
      setTexts([...texts, addedText])
      setNewText('')
    }
  }

  const handleUpdate = async (id: number) => {
    if (editingText.trim()) {
      const updatedText = await updateText(id, editingText)
      if (updatedText) {
        setTexts(texts.map(t => t.id === id ? updatedText : t))
        setEditingId(null)
      }
    }
  }

  const handleDelete = async (id: number) => {
    await deleteText(id)
    setTexts(texts.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex space-x-2">
        <Input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Enter new text"
          className="flex-grow"
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2">
        {texts.map((text) => (
          <li key={text.id} className="flex items-center space-x-2">
            {editingId === text.id ? (
              <>
                <Input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={() => handleUpdate(text.id)}>Save</Button>
                <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <span className="flex-grow">{text.content}</span>
                <Button variant="outline" onClick={() => {
                  setEditingId(text.id)
                  setEditingText(text.content)
                }}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(text.id)}>Delete</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

