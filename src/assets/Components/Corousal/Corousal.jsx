import Carousel from 'react-bootstrap/Carousel';
import style from './Corousal.module.css'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Elephant from '../../images/Elephant.jpg'

function Corousal() {
  return (
    <motion.div className={style.carouselWrapper} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <Carousel indicators={false}>
        <Carousel.Item>
        <img className={style.image} src={Elephant}></img>
        </Carousel.Item>
        
        <Carousel.Item>
      <img className={style.image} src="https://www.rekoforest.org/wp-content/uploads/2019/09/sambar-deer-indonesia.jpg"></img>
        </Carousel.Item>
        
        <Carousel.Item>
        <img className={style.image} src="https://res.cloudinary.com/roundglass/image/upload/v1650974313/rg/collective/media/smooth-coated-otter-sand-bar-one-phillip-ross_kofef5.jpg"></img>
        </Carousel.Item>
      </Carousel>
      <div className={style.heroOverlay}>
        <Link to="/events" className={style.heroButton}>See Events</Link>
      </div>
    </motion.div>
  );
}

export default Corousal;