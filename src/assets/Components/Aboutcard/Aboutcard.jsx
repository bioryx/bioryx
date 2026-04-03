import style from './Aboutcard.module.css'
import { motion } from 'framer-motion'

export default function Aboutcard(props) {
			  return (
              <>
                <motion.div 
                  className={style.card}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </motion.div>
              </>);
}