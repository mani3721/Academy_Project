import React from "react";
import { NavBar, Post, Footer } from "../Components";
import AnimatedPage from "./Framermotion";
import { motion } from "framer-motion";
const animations = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 10 },
  exit: { opacity: 0, y: -10 },
};

const Home = () => {
  return (
    <>
      <AnimatedPage>
        <motion.div
          variants={animations}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1.5 }}
        >
          <NavBar />
        </motion.div>

        <Post />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default Home;
