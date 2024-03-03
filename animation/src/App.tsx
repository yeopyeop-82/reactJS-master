import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";
import { linear } from "popmotion";

const Wrapper = styled(motion.div)`
  height: 500vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238)) 0%, rgb(0, 83, 238) 100%)",
      "linear-gradient(135deg, rgb(238, 0, 153)) 0%, rgb(221, 0, 238) 100%)",
      "linear-gradient(135deg, rgb(0, 238, 155)) 0%, rgb(0, 83, 238) 100%)",
    ]
  );

  const { scrollYProgress } = useViewportScroll();

  const scaleSize = useTransform(scrollYProgress, [0, 1], [1, 5]);

  return (
    <Wrapper style={{ background: gradient }}>
      <Box
        style={{
          x,
          rotate: scale,
          scale: scaleSize,
        }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

export default App;
