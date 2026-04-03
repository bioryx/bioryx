import style from './Banner.module.css'
import { motion } from 'framer-motion'
export default function Banner()
{
    return(
        <motion.div 
            className={style.banner}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1 }}
        >
            <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome to Bioryx
            </motion.h1>
            <motion.h3
                initial={{ x: 100, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                -Where Biology meets purpose
            </motion.h3>
        </motion.div>
    )
}