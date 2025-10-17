import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const Mystyle = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: var(--color-grey-500);
`;

const StyledApp = styled.div`
  background-color: var(--color-brand-200);
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert("hi")}>Check In</Button>
        <Button onClick={() => alert("hellow")}>Check Out</Button>

        <div>
          <Input value="number of guests" />
          <Input value="number of guests" />
        </div>
      </StyledApp>
    </>
  );
}

export default App;
