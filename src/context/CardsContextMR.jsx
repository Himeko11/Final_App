import { createContext, useState, useContext} from "react"
import UserContext from "./UserContextMR";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Winner from "../../images/winner.png";



const CardsContext = createContext();

const CardsProvider = ({children}) =>{

    const {IdPlayerCards} = useContext(UserContext);
    const [deckPlayerOne, setDeckPlayerOne] = useState([]);
    const [deckPlayerAux, setDeckPlayerAux] = useState([]);

    /* Winner Player */
    const [modalOpen, setModalOpen] = useState(false);

    const handleWin = () => {
      setModalOpen(true);
    };

    const handleClose = () => {
      setModalOpen(false);
    };

    const getCard = async () => {
      const url = `https://deckofcardsapi.com/api/deck/${IdPlayerCards}/draw/?count=1`;
      const { data } = await axios.get(url);
      setDeckPlayerOne(data.cards);
  
      console.log(deckPlayerOne);
      
      let winFlag = false;

      if ((deckPlayerOne.value === deckPlayerAux.value) && (deckPlayerOne.suit === 'CLUBS' && deckPlayerAux.suit === 'DIAMONS')){
        winFlag = true;
      }else if ((deckPlayerOne.value === deckPlayerAux.value) && (deckPlayerOne.suit === 'HEARTS' && deckPlayerAux.suit === 'SPADES')){
        winFlag = true;
      }else if ((deckPlayerOne.value === deckPlayerAux.value) && (deckPlayerOne.suit === 'DIAMONS' && deckPlayerAux.suit === 'CLUBS')){
        winFlag = true;
      }else if ((deckPlayerOne.value === deckPlayerAux.value) && (deckPlayerOne.suit === 'SPADES' && deckPlayerAux.suit === 'DIAMONS')){
        winFlag = true;
      }   
      
      if (winFlag === true){
        console.log("Ganador");

        return (
          <>
        <Button onClick={handleWin}>¡Win!</Button>
        <Modal show={modalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¡Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src= {Winner} alt="Winner" />
            <button className="button2_disable">¡Player Win!</button>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button2" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </>
        )
      }
          
    };
  
    const getDeckPlayerOne = async () => {
      const url = `https://deckofcardsapi.com/api/deck/${IdPlayerCards}/draw/?count=1`;
      const { data } = await axios.get(url);
      setDeckPlayerOne(data.cards);
      if (deckPlayerAux.length === 0) {
        setDeckPlayerAux(deckPlayerOne)
      }else{
        console.log(deckPlayerAux)
      }
    };


    const data = {
      getDeckPlayerOne,
      getCard,
      deckPlayerOne,
    };
  
    return (
      <CardsContext.Provider value={data}>
        {children}
      </CardsContext.Provider>
    );
  };

export {CardsProvider}
export default CardsContext;


