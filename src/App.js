
import './App.css';
import { useEffect, useState, useRef } from 'react';

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';

// CSV imports are not natively supported by JS or needs parsing to make useable, 
// JSON is better as less code or libraries is needed to work with the data. JSON is also the go to formatting for JS
// import mapLocationData from './worldcities.csv';
import mapLocationData from './worldcities.json';

function App() {
  const [search,setSearch] = useState() 
  const [results,setResults] = useState()
  const [selected,setSelected] = useState()

  const ref = useRef(null);
  const mapRef = useRef(null);

  const searchByString = (target)=>{
    let filteredData = mapLocationData.filter(item => {
      // Check if the item contains the substring, use all lowercase to allow for case insensitive search
      return JSON.stringify(item).toLowerCase().includes(target.toLowerCase());
    });
    return(filteredData)
  }

  useEffect(()=>{
    if(search){
      setResults(searchByString(search))
    }else{
      setSelected()
    }
  },[search])

  useEffect(() => {
    console.log("Mounting!");
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({ center: [0, 0], zoom: 1 }),
        target: ref.current
      });
    }
  }, [ref, mapRef]);

  useEffect(() => {
    if(selected)
      mapRef.current?.getView().animate({ zoom: 6 }, { center: fromLonLat([selected.lng,selected.lat]) }, { duration: 1000 });
  }, [mapRef, selected]);

  useEffect(()=>{
    console.log(mapLocationData)
  },[])

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
                    results.map((item,index)=>{
                      if(index>10){
                        return("")
                      }
                      return(<li onClick={()=>{setSelected({title:`${item.country}, ${item.city}`, lat: item.lat, lng: item.lng})}}>{item.country}, {item.city}</li>)
                    })
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
          <div> 
            <h3>Location Selected</h3>
            <span><b>Title:</b> {selected.title}</span>
            <span><b>Coordinates:</b> {selected.lat + ', ' + selected.lng}</span>
          </div>
        }
      </section>
      <div ref={ref} className='map' id='map'></div>
      <footer>
        <div className='top'>
          <span>Places Simple Recreation</span>
        </div>
        <div className='bottom'>
          <span>This app openlayers and uses the `free tier` City Data sourced from <a href='https://simplemaps.com' target="_blank" rel="noreferrer">simplemaps.com</a> it contains 41k entries. </span>
         </div>
      </footer>
    </main>
  );
}

export default App;