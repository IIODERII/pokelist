import './App.css'
import CardList from './components/CardList'

function App() {

  return (
    <div className='container mx-auto py-10 px-10 mt-10 border border-white rounded-xl backdrop-blur-sm'>
      <h1 className='text-center text-5xl font-bold mb-5'>PokéList</h1>
      <p className="text-center">A place to find all the Pokémons (or at least the first 50)</p>
      <CardList />
    </div>
  )
}

export default App
