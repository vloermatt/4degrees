import { Button, Center, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export default () => {
  const [input, setInput] = useState("");
  const [wordOfTheDay, setWordOfTheDay] = useState("");
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    console.log("attempting to connect...");
    const res = await fetch("/api/play");
    console.log({ res });
    const newSocket = await io({
      path: "/api/play/",
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    console.log("socket change!");
    if (socket) {
      socket.on("connect_error", (err) => {
        console.log({ err });
      });
      socket.on("connect", () => {
        setSocketConnected(true);
        console.log("connected!");
      });
      socket;
      socket.on("disconnect", () => {
        setSocketConnected(false);
        console.log("disconnected...");
      });
      socket.on("message", (message) => setWordOfTheDay(message));
    }
  }, [socket]);

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onButtonClick = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    console.log({ res });
  };
  return (
    <>
      <Center>
        <VStack>
          <Heading>some things are brewing...</Heading>
          <Text>{`Socket connection state: ${socketConnected}`}</Text>
          <Text>{`Word of the day: ${wordOfTheDay}`}</Text>
          <Input
            placeholder="Type something?"
            value={input}
            onChange={onChangeHandler}
          />
          <Button onClick={onButtonClick}>send it</Button>
        </VStack>
      </Center>
    </>
  );
};
