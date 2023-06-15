import Header from "./components/HeaderMR"
import Login from "./pages/LoginMR"
import CardList from "./pages/CardListMR"
import NotFound from "./pages/NotFoundMR"


import { useState } from "react"
import { Container } from "@mui/material"
import { UserProvider } from "./context/UserContextMR"
import { CardsProvider } from "./context/CardsContextMR"
import { Route, Routes,  BrowserRouter as Router} from "react-router-dom"


const App = () => {

  const [playerOne, setPlayerOne] = useState('');


  return (
    <div className="back-image">
      <Router>
        <UserProvider>
          <CardsProvider>
            <Container>
              <Routes>
                <Route path="/" element={<Header/>}>
                  <Route path="/" element={<Login setPlayerOne={setPlayerOne} />} />
                  <Route path="CardList" element={<CardList playerOne={playerOne} />} />
                  <Route path="/*" element={<NotFound />} />
                </Route>
              </Routes>
            </Container>
          </CardsProvider>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App;