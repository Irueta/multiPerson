import { useEffect, useState } from "react";
import rectangleImage from '../assets/Rectangle_14.png';

const Buscador = () => {
    const [data, setData] = useState([]);
    const [numHabitaciones, setNumHabitaciones] = useState(0);
    const [numBanios, setNumBanios] = useState(0);
    const [surface, setSurface] = useState(0);
    const [price, setPrice] = useState(0);
    const [value, setValue] = useState(50);
    const [resultado, setResultado] = useState(0);
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedButton2, setSelectedButton2] = useState(null);


    async function obtenerPrediccion(surface, bedrooms, restrooms) {
        try {
          const url = `https://josemarido.pythonanywhere.com/predict?surface=${surface}&bedrooms=${bedrooms}&restrooms=${restrooms}`;
      
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
      
          if (!response.ok) {
            throw new Error(`Error al obtener la respuesta, estado: ${response.status}`);
          }
      
          const data = await response.json();
      
          console.log('Datos de la predicción:', data);
          // Puedes hacer más cosas con los datos aquí
      
          return data; // Devuelve los datos obtenidos
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
          throw error; // Vuelve a lanzar el error para que el consumidor de la función pueda manejarlo si es necesario
        }
      }


    const handleNumHabitaciones = (num) => {
        setNumHabitaciones(num);
        setSelectedButton(num);
    }

    const handleNumBanios = (num) => {
        setNumBanios(num);
        setSelectedButton2(num);
    }
    const handleSurface = (e) => {
        setSurface(e.target.value);
    }
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "bedrooms": numHabitaciones,
            "restrooms": numBanios,
            "surface": surface,
        }
        console.log("DATA",data);
       const newResultado = await obtenerPrediccion(data.surface, data.bedrooms, data.restrooms);
       console.log("NEWRESULTADO",newResultado);
       setResultado(newResultado);
        
    }

  return (
    <>
    <section>
      <div>
    <h1>Hola Aitor!</h1>
      </div>
    <div>
    <img src={rectangleImage} alt="" />
    </div>
    <div>
    <label>Nº de habitaciones</label>
    <button onClick={() => handleNumHabitaciones(1)} style={{backgroundColor: selectedButton === 1 ? '#0957CB' : 'initial', color: selectedButton === 1 ? "white" : "initial"}}>1</button>
    <button onClick={() => handleNumHabitaciones(2)} style={{backgroundColor: selectedButton === 2 ? '#0957CB' : 'initial', color: selectedButton === 2 ? "white" : "initial"}}>2</button>
    <button onClick={() => handleNumHabitaciones(3)} style={{backgroundColor: selectedButton === 3 ? '#0957CB' : 'initial', color: selectedButton === 3 ? "white" : "initial"}}>3</button>
    <button onClick={() => handleNumHabitaciones(4)} style={{backgroundColor: selectedButton === 4 ? '#0957CB' : 'initial', color: selectedButton === 4 ? "white" : "initial"}}>4</button>
    </div>
    <div>
    <label>Nº baños</label>
    <button onClick={() => handleNumBanios(1)} style={{backgroundColor: selectedButton2 === 1 ? '#0957CB' : 'initial', color: selectedButton2 === 1 ? "white" : "initial"}}>1</button>
    <button onClick={() => handleNumBanios(2)} style={{backgroundColor: selectedButton2 === 2 ? '#0957CB' : 'initial', color: selectedButton2 === 2 ? "white" : "initial"}}>2</button>
    <button onClick={() => handleNumBanios(3)} style={{backgroundColor: selectedButton2 === 3 ? '#0957CB' : 'initial', color: selectedButton2 === 3 ? "white" : "initial"}}>3</button>
    <button onClick={() => handleNumBanios(4)} style={{backgroundColor: selectedButton2 === 4 ? '#0957CB' : 'initial', color: selectedButton2 === 4 ? "white" : "initial"}}>4</button>
    </div>
    <div>
    <label> Superficie
    <input type="range" value={surface} min="50" max="100" onChange={handleSurface} />
    <p>{surface}mts</p>
    </label>
    </div>
    <div>
    {resultado ? <p>El precio estimado es {Math.round(resultado.predictions)} €/mes</p> : <p>El precio estimado es 0 €/mes</p>}
    </div>
    <div>
        <button onClick={handleSubmit}>Buscar</button>
    </div>
    <form action=""></form>

    </section>

      
    </>
  )
}

export default Buscador