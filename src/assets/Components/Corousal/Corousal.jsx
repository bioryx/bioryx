import Carousel from 'react-bootstrap/Carousel';
import style from './Corousal.module.css'

function Corousal() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className={style.image} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Lion-tailed_macaque_by_N_A_Nazeer.jpg/1280px-Lion-tailed_macaque_by_N_A_Nazeer.jpg"></img>
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      
      <Carousel.Item>
    <img className={style.image} src="https://animals.sandiegozoo.org/sites/default/files/2016-09/animals_hero_leopard_0.jpg"></img>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      
      <Carousel.Item>
        <img className={style.image} src="https://sustainabletravel.org/wp-content/uploads/Asian-elephants-socializing-1200x675-1.webp"></img>
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default Corousal;