import { useState, useEffect, useReducer } from 'react';
import './App.css';
import Restaurant from './restaurant.jpg'
import { Routes, Route } from 'react-router-dom';
import { Home, About, Events, Contact, Whoops404, Services, CompanyHistory, Location } from './pages'

function Header(props) {
  return(
    <header>
      <h1>{props.name}'s Kitchen</h1>
    </header>
  )
}

function Main(props) {
  return(
    <section>
      <p>We serve the most {props.adjective} food around :)</p>
      <img src={Restaurant} height="200" alt="Napkin and Fork at a Restaurant table" />
      <ul style={{textAlign: "left"}}>
        {props.dishes.map((dish) => 
          <li key={dish.id}>{dish.title}</li>
        )}
      </ul>
    </section>
  )
}

function Footer(props) {
  return(
    <footer>
      <p>Copyright {props.year}</p>
    </footer>
  )
}

function NotAuthorized() {
  return(
    <p>You are not Authorized to view the content</p>
  )
}

function AuthorizedContent() {
  return (
    <div className="App">
      <Header name="Nishant" />
      <Main adjective="amazing" dishes={dishObjects} />
      <Footer year={new Date().getFullYear()} />
    </div>
  )
}

const dishes = [
  "Butter Chicken",
  "Piza",
  "Burger"
]

const dishObjects = dishes.map((dish, index) => ({id: index, title: dish}))

// Array De-structuring

// const checkList = ["boots", "tent", "lamp"]
// console.log(checkList[1])

// const [,,light] = ["boots", "tent", "lamp"]
// console.log(light)

function App({authorized, login}) {
  const [emotion, setEmotion] = useState("Happy")
  const [secondary, setSecondary] = useState("Sad")
  const [checked, toggle] = useReducer(checked => !checked, false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if(!login) return;
    setLoading(true)
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError)
  }, [login])

  useEffect(() => {
    console.log(`It's ${emotion} around here`)
  }, [emotion])

  useEffect(() => {
    console.log(`It's ${secondary} around here`)
  }, [secondary])

  return(
    <> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}>
          <Route path="/services" element={<Services />}/>
          <Route path="/history" element={<CompanyHistory />}/>
          <Route path="/location" element={<Location />}/>
        </Route>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/events" element={<Events />}/>
        <Route path="*" element={<Whoops404 />}/>
      </Routes>
      <h1>Welcome</h1>
      <h1>Current emotion is {emotion} and {secondary}</h1>
      <button onClick={() => setSecondary("Sad")}>Sad</button>
      <button onClick={() => setSecondary("Frustrated")}>Frustrated</button>
      <button onClick={() => setEmotion("Happy")}>Happy</button>
      <input type="checkbox" value={checked} onChange={toggle} />
      <p>{checked ? "Checked" : "Not Checked"}</p>
      {authorized ? <AuthorizedContent /> : <NotAuthorized />}
      {loading ? <h3>"Loading..."</h3>: null}
      {error ? <h3>{JSON.stringify(error, null, 2)}</h3>: null}
      {data ? 
        <>
          <h1>{data.login}</h1>
        </> 
      : null}
    </>
  )
}

export default App;
