import "./styles/theme.css";
import "./styles/global.css";
import { Logo } from "./components/Logo";
import { Container } from "./components/Container";

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
    </>
  );
}
