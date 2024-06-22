import React, { useState, useEffect, useRef } from "react";
import { Box, Text, VStack, Button } from "@chakra-ui/react";

const Index = () => {
  const [ballX, setBallX] = useState(50);
  const [ballY, setBallY] = useState(50);
  const [ballDX, setBallDX] = useState(2);
  const [ballDY, setBallDY] = useState(2);
  const [paddle1Y, setPaddle1Y] = useState(40);
  const [paddle2Y, setPaddle2Y] = useState(40);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const gameBoxRef = useRef(null);

  const paddleHeight = 20;
  const paddleWidth = 5;
  const ballSize = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setBallX((prev) => prev + ballDX);
      setBallY((prev) => prev + ballDY);
    }, 30);

    return () => clearInterval(interval);
  }, [ballDX, ballDY]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "w") setPaddle1Y((prev) => Math.max(prev - 5, 0));
      if (e.key === "s") setPaddle1Y((prev) => Math.min(prev + 5, 100 - paddleHeight));
      if (e.key === "ArrowUp") setPaddle2Y((prev) => Math.max(prev - 5, 0));
      if (e.key === "ArrowDown") setPaddle2Y((prev) => Math.min(prev + 5, 100 - paddleHeight));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (ballY <= 0 || ballY >= 100 - ballSize) setBallDY((prev) => -prev);

    if (ballX <= paddleWidth) {
      if (ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
        setBallDX((prev) => -prev);
      } else {
        setScore2((prev) => prev + 1);
        resetBall();
      }
    }

    if (ballX >= 100 - paddleWidth - ballSize) {
      if (ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
        setBallDX((prev) => -prev);
      } else {
        setScore1((prev) => prev + 1);
        resetBall();
      }
    }
  }, [ballX, ballY]);

  const resetBall = () => {
    setBallX(50);
    setBallY(50);
    setBallDX(2);
    setBallDY(2);
  };

  return (
    <Box ref={gameBoxRef} position="relative" width="100%" height="100vh" bg="gray.800" display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={4} position="absolute" top={4} left={4}>
        <Text fontSize="2xl" color="white">Player 1: {score1}</Text>
        <Text fontSize="2xl" color="white">Player 2: {score2}</Text>
      </VStack>
      <Box position="relative" width="100%" height="100%" maxW="600px" maxH="400px" bg="gray.900" border="2px solid white">
        <Box position="absolute" left={`${ballX}%`} top={`${ballY}%`} width={`${ballSize}px`} height={`${ballSize}px`} bg="white" borderRadius="50%" />
        <Box position="absolute" left="0" top={`${paddle1Y}%`} width={`${paddleWidth}px`} height={`${paddleHeight}%`} bg="white" />
        <Box position="absolute" right="0" top={`${paddle2Y}%`} width={`${paddleWidth}px`} height={`${paddleHeight}%`} bg="white" />
      </Box>
    </Box>
  );
};

export default Index;