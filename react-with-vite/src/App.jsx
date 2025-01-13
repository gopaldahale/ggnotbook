import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, minusByAmount } from './redux/counter/counterSlice'

function App() {
  // const [count, setCount] = useState(0);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState(null);
  const [intervalIdMinus, setIntervalIdMinus] = useState(null);

  const startIncrement = () => {
    const id = setInterval(() => {
      dispatch(incrementByAmount(10));  
    }, 300);  
    setIntervalId(id); 
  };
  const startMinus = () => {
    const id = setInterval(() => {
      dispatch(minusByAmount(10));  
    }, 150);  
    setIntervalIdMinus(id); 
  };

  const stopIncrement = () => {
    clearInterval(intervalId);  
    setIntervalId(null);
  };
  const stopMinus = () => {
    clearInterval(intervalIdMinus);  
    setIntervalIdMinus(null);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId); 
      }
      if (intervalIdMinus) {
        clearInterval(intervalIdMinus); 
      }
    };
  }, [intervalId,intervalIdMinus]);
  
  return (
    <>
      <Navbar countPropsVar={count} />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <div className="card-body">
                  <button className='btn-primary' onClick={()=>dispatch(increment())} onMouseDown={startIncrement} onMouseUp={stopIncrement} >
                    +
                  </button>
                  
                  <span className='btn btn-secondary mx-5'>Amount is {count}$</span>
                  <button className='btn-primary' onClick={() => dispatch(decrement())} onMouseDown={startMinus} onMouseUp={stopMinus} >
                    -
                  </button>
                  <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                  </p>

                </div>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
