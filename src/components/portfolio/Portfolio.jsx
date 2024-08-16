import "./portfolio.scss";
import {motion,useScroll,useSpring, useTransform} from "framer-motion";
import { useRef } from "react";

const items = [
    {
        id :1,
        title:"Automated Log analyzer & alert",
        img: "https://img.freepik.com/free-vector/analysis-concept-illustration_114360-1119.jpg?t=st=1714119526~exp=1714123126~hmac=ab25e73247661fff1da33214c1dc55afe65881972633544166ff1422a7c94bac&w=1380",

    },
    {
        id :2,
        title:"Advanced search & filtering capabilities",
        img: "https://img.freepik.com/free-vector/search-concept-illustration_114360-95.jpg?t=st=1714160876~exp=1714164476~hmac=735763d8b7fd9bf4f4e2e7a41b37f3c3492b62b3752d3c786c0f2d2c0fb0a84c&w=1380",

    },
    {
        id :3,
        title:"Easy 3rd party integration",
        img: "https://img.freepik.com/free-vector/paper-style-core-values-background_23-2149079276.jpg?t=st=1714160928~exp=1714164528~hmac=9f35ae072d5b803ff81b32877ca2f7aeb99a64a11ad9e830c06909395d9f5823&w=2000",

    },
    // {
    //     id :4,
    //     title:"Goal tracker",
    //     img: "https://img.freepik.com/free-vector/business-background-design_1300-99.jpg",

    // },
];

const Single = ({item}) =>{

    const ref = useRef();

    const{scrollYProgress} = useScroll({
        target:ref,
        // offset:["start start","end start"]
    });

    const y = useTransform(scrollYProgress ,[0,1],[-300,300]);
    return(
      <section ref = {ref}>
        <div className="container">
            <div className="wrapper">
                <div className="imageContainer">
                  <img src={item.img} alt="" />
                </div>
                <motion.div className="textContainer" style={{y}}>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>

                </motion.div>
            </div>
        </div>
    </section>
    );
};
const Portfolio = () => {

    const ref = useRef();
    const{scrollYProgress} = useScroll({target:ref,offset:["end end" , "start start"]
    }); 

    const scaleX = useSpring(scrollYProgress,{
        stiffness: 100,
        damping: 30,
    });
   
    return (
        <div className="portfolio" ref={ref} >
            <div className="progress">
                <h1>Future Enhancement</h1>
                <motion.div style={{scaleX}} className="progressBar"></motion.div>
            </div>
            {items.map((item) => (
                <Single item={item} key={item.id}/>
            ))}

        </div>
    );
    
};

export default Portfolio;