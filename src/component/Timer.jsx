import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";

function Timer() {
  const [time, setTime] = useState();
  const [history, setHistory] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isChecked && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((item) => item - 1);
      }, 1000);
    } else if (time === 0) {
      setIsChecked(false);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isChecked, time]);

  const handleStart = () => {
    if (time > 0 && !isChecked) {
      setIsChecked(true);
      setHistory((prevList) => [...prevList, time]);
    }
  };
  const handlePause = () => {
    setIsChecked(false);
    clearInterval(intervalRef.current);
  };
  const handleReset = () => {
    setIsChecked(false);
    setTime(0);
    clearInterval(intervalRef.current);
  };
  const memories = useMemo(() => {
    return history.map((item, index) => <li key={index}>{item} sec</li>);
  }, [history]);

  const handleChange = (e) => {
    setTime(Number(e.target.value));
  };

  return (
    <>
      <Div>
        <Left>
          <Input
            type="number"
            placeholder="enter second"
            value={time}
            onChange={handleChange}
          />

          <Button onClick={handleStart}>Start</Button>
          <Button onClick={handlePause}>Pause</Button>
          <Button onClick={handleReset}>Reset</Button>
          <P>Time:{time}</P>
        </Left>
        <Right>
          <h3>History</h3>
          <ul>{memories}</ul>
        </Right>
      </Div>
    </>
  );
}
export default Timer;
export const Div = styled.div`
  display: grid;
  grid-template-columns: 600px 300px;
`;

export const Left = styled.div`
  display: grid;
  grid-template-columns: 250px 110px 110px 110px;
`;
export const Right = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;
export const Button = styled.button`
  width: 100px;
  background: #9eb9d0;
  height: 30px;
  border: 1px solid cadetblue;
`;
export const Input = styled.input`
  width: 230px;
  height: 30px;
  border: 1px solid #22657b;
`;
export const P = styled.p`
  grid-area: 2/1 / span 1 / span 4;

  margin: auto;
  text-align: center;
`;
