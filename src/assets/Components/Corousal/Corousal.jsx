import Carousel from 'react-bootstrap/Carousel';
import style from './Corousal.module.css'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Corousal() {
  return (
    <motion.div className={style.carouselWrapper} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <Carousel indicators={false}>
        <Carousel.Item>
        <img className={style.image} src="https://sustainabletravel.org/wp-content/uploads/Asian-elephants-socializing-1200x675-1.webp"></img>
        </Carousel.Item>
        
        <Carousel.Item>
      <img className={style.image} src="https://animals.sandiegozoo.org/sites/default/files/2016-09/animals_hero_leopard_0.jpg"></img>
        </Carousel.Item>
        
        <Carousel.Item>
        <img className={style.image} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Lion-tailed_macaque_by_N_A_Nazeer.jpg/1280px-Lion-tailed_macaque_by_N_A_Nazeer.jpg"></img>
        </Carousel.Item>
      </Carousel>
      <div className={style.heroOverlay}>
        <Link to="/events" className={style.heroButton}>See Events</Link>
      </div>
    </motion.div>
  );
}

export default Corousal;