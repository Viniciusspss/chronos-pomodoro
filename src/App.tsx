import "./styles/theme.css";
import "./styles/global.css";
import { Logo } from "./components/Logo";
import { Container } from "./components/Container";
import { Menu } from "./components/Menu";

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>
    </>
  );
}
