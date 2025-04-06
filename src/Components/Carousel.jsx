import React, { useRef, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { motion, useAnimation } from "framer-motion";

export default function CarouselC() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const cardWidth = 22 * 16; // Width of one card in pixels (22rem * 16px)
  const numberOfCards = cards.length;
  const totalWidth = cardWidth * numberOfCards; // Total width of one set of cards
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  useEffect(() => {
    const loop = async () => {
      while (true) {
        if (!isHovered) {
          // Move the carousel to the left by the total width of one set of cards
          await controls.start({
            x: -totalWidth,
            transition: {
              duration: 20, // Adjust duration for speed (lower = faster)
              ease: "linear",
            },
          });

          // Reset the position to create a seamless loop
          controls.set({ x: 0 });
        } else {
          // If hovered, stop the animation
          await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to avoid blocking
        }
      }
    };

    loop();
  }, [controls, totalWidth, isHovered]);

  return (
    <div
      className="relative flex flex-col justify-center items-center min-h-screen px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #0f172a)", // Gradient background
      }}
    >
      {/* Header */}
      <header className="text-center mb-12">
        <Typography
          variant="h1"
          color="white"
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Our Services
        </Typography>
        <Typography
          variant="lead"
          color="white"
          className="text-lg md:text-xl opacity-80"
        >
          Discover the best solutions tailored for your needs.
        </Typography>
      </header>

      {/* Carousel */}
      <div className="flex overflow-hidden rounded-lg" style={{ width: "80%" }}>
        <motion.div
          ref={containerRef}
          className="flex space-x-6"
          style={{ width: totalWidth * 2 + "px" }} // Double width for seamless looping
          initial={{ x: 0 }}
          animate={controls}
        >
          {/* Render the cards twice for seamless looping */}
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[22rem]"
              onHoverStart={() => {
                setIsHovered(true);
                controls.stop(); // Pause animation on hover
              }}
              onHoverEnd={() => {
                setIsHovered(false);
              }}
              whileHover={{ scale: 1.05 }} // Scale up on hover
            >
              <CardItem {...card} />
            </motion.div>
          ))}
          {cards.map((card, index) => (
            <motion.div
              key={index + cards.length}
              className="flex-shrink-0 w-[22rem]"
              onHoverStart={() => {
                setIsHovered(true);
                controls.stop(); // Pause animation on hover
              }}
              onHoverEnd={() => {
                setIsHovered(false);
              }}
              whileHover={{ scale: 1.05 }} // Scale up on hover
            >
              <CardItem {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}

// Card Data and CardItem component
const cards = [
  {
    title: "High Quality Steel",
    subtitle: "Premium TMT Bars",
    img: "https://arsgroup.in/wp-content/uploads/2024/09/quality-tmt-bar-2.webp",
  },
  {
    title: "Fencing Solutions",
    subtitle: "Durable fencing for every need",
    img: "https://www.fencingwiredealer.com/images/slider_img.jpg",
  },
  {
    title: "Innovative Design",
    subtitle: "For modern spaces",
    img: "https://th.bing.com/th/id/OIP.VQ2iwwYUsQ5DoVmn1x6csAHaFj?rs=1&pid=ImgDetMain",
  },
  {
    title: "Custom Solutions",
    subtitle: "Tailored designs",
    img: "https://www.metalroofportstlucie.com/wp-content/uploads/2020/10/Commercial-Metal-Roofing-Port-St.-Lucie-Metal-Roofing-Company.jpg",
  },
];

const CardItem = ({ title, subtitle, img }) => (
  <Card
    shadow={true}
    className="relative grid h-[24rem] w-[22rem] items-end justify-center 
                   overflow-hidden text-center rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
  >
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="absolute inset-0 m-0 h-full w-full rounded-lg bg-cover bg-center hover:opacity-90 duration-500 overflow-hidden"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
    </CardHeader>
    <CardBody className="relative py-10 px-6 md:px-10">
      <Typography
        variant="h3"
        color="white"
        className="mb-4 font-bold text-lg md:text-2xl leading-tight animate-fadeIn"
      >
        {title}
      </Typography>
      <Typography color="white" className="text-sm md:text-base opacity-75 animate-fadeIn delay-300">
        {subtitle}
      </Typography>
    </CardBody>
  </Card>
);