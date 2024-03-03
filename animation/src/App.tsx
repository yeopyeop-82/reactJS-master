import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: (isBack: boolean) => ({
    x: 0,
    opacity: 1,
    scale: 1,
  }),
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = async () => {
    await setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlease = async () => {
    await setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence>
        <Box
          custom={back}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
          transition={{
            duration: 0.3,
          }}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  );
}

export default App;
