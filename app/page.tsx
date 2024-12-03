import { getTexts } from './actions'
import TextList from './components/TextList'

export default async function Home() {
  const texts = await getTexts()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Text List</h1>
      <TextList initialTexts={texts} />
    </main>
  )
}

