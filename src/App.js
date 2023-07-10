import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [search,setSearch] = useState() 
  const [results,setResults] = useState()
  const [selected,setSelected] = useState()


  useEffect(()=>{
    if(search){
      setResults(['dummy data','dummy data','dummy data','dummy data'])
    }else{
      setSelected()
    }
  },[search])

  useEffect(()=>{console.log(selected)},[selected])

  return (
    <main className="App">
      <h1>Maps Place Recreation with Auto Complete</h1>
      <section className='searchContainer'>
        <textarea rows={1} onChange={(e)=>setSearch(e.target.value)}></textarea>
        {search&&!selected&&
          <div className='selectOptions'>
            <ul>
              {results?
                <>
                  {
                    results.map(item=><li onClick={()=>{setSelected({title:item, lat:'12', lng:'12'})}}>{item}</li>)
                  }
                </>
              :<li>no results...</li>
                
              }
            </ul>
          </div>
        }
      </section>
      <section className='results'>
        {selected&&
          <> 
            <h3>Location Selected</h3>
            <span> <b>Title:</b>{selected.title}<br/>,<b>Coordinates:</b> {selected.lat + ', ' + selected.lng}</span>
          </>
        }
      </section>
      <footer>
        <div className='top'>
          <span>Places</span>
        </div>
        <div className='bottom'>
          <span>This app uses the papa to get the data, but theres probable better ways to </span>
        </div>
      </footer>
    </main>
  );
}

const SearchResults = ()=>{
  
}

export default App;
