import { useEffect, useState } from "react";
import rectangleImage from '../assets/Rectangle_14.png';
import "./style.css"

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
          const url = `https://egoup.pythonanywhere.com/predict?surface=${surface}&bedrooms=${bedrooms}&restrooms=${restrooms}`;
      
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
          
      
          return data; 
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
          throw error; 
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
        <section className="buscador-container">
          <div className="saludo">
            <h1>Hola Aitor!</h1>
          </div>
          <div className="imagen-container">
            <img src={rectangleImage} alt="" className="imagen" />
          </div>
          <div className="habitaciones-container">
            <label className="texto-label">Nº de habitaciones</label>
            <div className="botones-container">
            <button onClick={() => handleNumHabitaciones(1)} className={`boton-numero ${selectedButton === 1 ? 'seleccionado' : ''}`}>1</button>
            <button onClick={() => handleNumHabitaciones(2)} className={`boton-numero ${selectedButton === 2 ? 'seleccionado' : ''}`}>2</button>
            <button onClick={() => handleNumHabitaciones(3)} className={`boton-numero ${selectedButton === 3 ? 'seleccionado' : ''}`}>3</button>
            <button onClick={() => handleNumHabitaciones(4)} className={`boton-numero ${selectedButton === 4 ? 'seleccionado' : ''}`}>4</button>
          </div>
          </div>
          <div className="banios-container">
            <label>Nº baños</label>
            <div className="botones-container">
            <button onClick={() => handleNumBanios(1)} className={`boton-numero ${selectedButton2 === 1 ? 'seleccionado' : ''}`}>1</button>
            <button onClick={() => handleNumBanios(2)} className={`boton-numero ${selectedButton2 === 2 ? 'seleccionado' : ''}`}>2</button>
            <button onClick={() => handleNumBanios(3)} className={`boton-numero ${selectedButton2 === 3 ? 'seleccionado' : ''}`}>3</button>
            <button onClick={() => handleNumBanios(4)} className={`boton-numero ${selectedButton2 === 4 ? 'seleccionado' : ''}`}>4</button>
          </div>
          </div>
          <div className="superficie-container">
            <label> Superficie
              <input type="range" value={surface} min="50" max="100" onChange={handleSurface} className="rango-superficie" />
              <p className="superficie-valor">{surface}mts</p>
            </label>
          </div>
          <div className="resultado-container">
            {resultado ? <p className="resultado">{Math.round(resultado.prediction)} €/mes</p> : <p lassName="resultado"> 0 €/mes</p>}
          </div>
          <div className="buscar-container">
            <button onClick={handleSubmit} className="boton-buscar">Buscar</button>
          </div>
          <form action="" className="formulario"></form>
        </section>
      </>
    );
  };
  
  export default Buscador;