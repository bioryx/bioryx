import style from './Homebody.module.css'
import { upcoming } from '../upcomarr'
import Upcoming from '../Upcoming/Upcoming'
import { motion } from 'framer-motion'

export default function Homebody() {
    return(
        <>
        <div className={style.biomain}>
            <div className={style.biocard}>
                <motion.div className={style.biotext} initial={{opacity:0, y: 50}} whileInView={{opacity:1, y: 0}} transition={{duration:0.8}} viewport={{ once: true }}>
                    <h1>BIORYX</h1>
                    <p>Bioryx is a student-run community for biology students interested in all fields of biological science, from genetics and microbiology to ecology, botany, zoology, and conservation. It’s a shared space for academic discussions, study resources, field experiences, event updates, and science-based conversations.</p>
                </motion.div>
                <motion.img src="https://www.fauna-flora.org/wp-content/uploads/2017/06/naturepl_00568429.jpg" alt="" initial={{opacity:0, x: 50}} whileInView={{opacity:1, x: 0}} transition={{duration:0.8}} viewport={{ once: true }}/>
            </div>
            <div className={style.biocard2}>
                <motion.img src="https://i.pinimg.com/1200x/f2/e9/1a/f2e91a50ad0252a5731ec44444fa3b62.jpg" alt="" initial={{opacity:0, x: -50}} whileInView={{opacity:1, x: 0}} transition={{duration:0.8}} viewport={{ once: true }}/>
                <motion.div className={style.biotext2} initial={{opacity:0, y: 50}} whileInView={{opacity:1, y: 0}} transition={{duration:0.8}} viewport={{ once: true }}>
                    <h1>OUR FOCUS</h1>
                    <p>Built on curiosity and a deep respect for the life sciences, Bioryx brings students together to learn collaboratively, exchange ideas, and engage in meaningful discussions. It fosters scientific thinking and environmental awareness while creating a supportive space for exploration and growth, empowering students to develop their knowledge, curiosity, and identity as biologists.</p>
                </motion.div>
            </div>
            <motion.div className={style.biobot} initial={{opacity:0, scale: 0.9}} whileInView={{opacity:1, scale: 1}} transition={{duration:0.6}} viewport={{ once: true }}>
                <h1>Bioryx - Where biology meets purpose...</h1>
            </motion.div>
            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.8}} viewport={{ once: true }}>
                <h1>Our Events</h1>
                <div className={style.cards}>
                    {upcoming.map((event,index)=>{
                        return(
                            <Upcoming key={index} image={event.image} title={event.title} host={event.host} location={event.location} date={event.date} time={event.time} reglink={event.reglink}></Upcoming>
                        )
                    })}
                </div>
            </motion.div>
        </div>
        </>
    )
}
