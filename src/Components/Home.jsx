import React from 'react'
import img from "../Assets/home.jpg"
import Lottie from 'lottie-react';
import animationData from '../Assets/home_ani.json';
import NavBar from './NavBar';
function Home() {
    return (
        <div className=''>
            <NavBar/>
            <div  style={{'--image-url': `url(${img})`}} 
  className='bg-[image:var(--image-url)] h-[42.15rem] bg-cover  flex items-center'>
                <div className='text-white font-serif text-5xl ml-24 '>
                    <p>Sri Kumaarn Steels</p>
                    <p>Sri Ram Steels</p>
                </div>
                <span className='ml-56'>
                    {/* <Lottie animationData={animationData} loop={true} autoplay={true}
                        style={{
                            width: '50%',
                            height: '50%',
                            bottom: 170,
                            objectFit: 'cover',
                            position: "absolute",

                        }}
                    /> */}
                </span>
            </div>
        </div>
    )
}

export default Home;
