import { useEffect } from "react";
import { Container } from "../../components/Container";
import { CountDown } from "../../components/CountDown";
import { Form } from "../../components/Form";
import { MainTemplate } from "./../../templates/MainTemplate/index";

export function Home() {
  useEffect(() => {
    document.title = "Chronos Pomodoro";
  }, []);

  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <Form />
      </Container>
    </MainTemplate>
  );
}
