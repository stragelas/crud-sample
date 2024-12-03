'use server'

import fs from 'fs/promises'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const dataFilePath = path.join(dataDir, 'texts.json')

async function ensureDataFileExists() {
  try {
    await fs.access(dataFilePath)
  } catch (error) {
    // If the file doesn't exist, create the directory and file
    await fs.mkdir(dataDir, { recursive: true })
    await fs.writeFile(dataFilePath, '[]')
  }
}

async function readTexts() {
  await ensureDataFileExists()
  const data = await fs.readFile(dataFilePath, 'utf8')
  return JSON.parse(data)
}

async function writeTexts(texts: any[]) {
  await ensureDataFileExists()
  await fs.writeFile(dataFilePath, JSON.stringify(texts, null, 2))
}

export async function getTexts() {
  return await readTexts()
}

export async function addText(text: string) {
  const texts = await readTexts()
  const newText = { id: Date.now(), content: text }
  texts.push(newText)
  await writeTexts(texts)
  return newText
}

export async function updateText(id: number, newContent: string) {
  const texts = await readTexts()
  const index = texts.findIndex((t: any) => t.id === id)
  if (index !== -1) {
    texts[index].content = newContent
    await writeTexts(texts)
    return texts[index]
  }
  return null
}

export async function deleteText(id: number) {
  const texts = await readTexts()
  const newTexts = texts.filter((t: any) => t.id !== id)
  await writeTexts(newTexts)
}

