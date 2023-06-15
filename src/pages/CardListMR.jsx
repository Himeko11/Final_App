import { useContext, useEffect} from "react"
import CardsContext from "../context/CardsContextMR";

const CardList = ({playerOne}) => {

  const {getDeckPlayerOne, deckPlayerOne, getCard} = useContext(CardsContext);

  useEffect(() => {
    getDeckPlayerOne();
  }, []);

  return (
    <>

      <button className="button1" onClick={getCard}>Cards</button>

      <h2>{`Player One is ${playerOne}`}</h2>
      <h3>Cards Obtained</h3>
      {deckPlayerOne.map(
        (deckOne) => (
          <img key={deckOne.code} src={deckOne.image} />
        )
      )}
    </>
  )
}

export default CardList