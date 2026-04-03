import style from "./Ourevents.module.css"
import Upcoming from "../Upcoming/Upcoming"
import Past from "../Past/Past"
import {upcoming} from "../upcomarr"
import { motion } from "framer-motion"
export default function Ourevents() {
        
    const past =[
        {
            title: "Endosulfan: Facts and Fiction",
            host: "Dr K. M. Sreekumar - Former Professor & Head, Agricultural Entomology, Kerala Agricultural University (KAU)",
            location: "Google meet",
            date: "14 February 2026",
            time: "8:00 PM - 9:00 PM"
        },
		{
            title: "BIOLOGICAL INVASIONS. SO WHAT? ",
            host: "Dr T. V. Sajeev, Chief Scientist, Kerala Forest Research Institute",
            location: "Google meet",
            date: "February 21, 2026",
            time: "7:30 PM - 8:30 PM"
        },
        {
            title: "Lichens: Neither Plant nor Fungus… So What Are They?",
            host: "Dr. Stephen Sequiera - Associate Professor & Research Guide, Maharaja’s College, Ernakulam",
            location: "Google Meet",
            date: "28 February 2026",
            time: "7:30 PM - 8:30 PM"
        },
        {
            title: "Seeds of Inquiry: Transforming Botanical Observations into Research Programmes",
            host: "Dr. Harikrishnan E - Assistant Professor, Payyannur College",
            location: "Google Meet",
            date: "7 March 2026",
            time: "7:30 PM - 8:30 PM"
        },
        {
            title: "Amphibians: Ecology and Ecological Significance",
            host: "Dr. Sujith V. Gopalan - Herpetologist & Conservation Biologist",
            location: "Google Meet",
            date: "14 March 2026",
            time: "7:30 PM - 8:30 PM"
        },
        {
            title: "Diversity & Status of Bryophyte Studies in the Western Ghats",
            host: "Dr. Manju C Nair - Bryologist | Associate Professor, Department of Botany, University of Calicut",
            location: "Google Meet",
            date: "21 March 2026",
            time: "7:30 PM - 8:30 PM"
        },
        {
            title: "Stories of Simplicity to Significance: The Hidden Power of Marine Sponges",
            host: "Dr. Anita M George - Marine Biologist & Expert in Sponge Taxonomy, Assistant Professor at the University of Kerala",
            location: "Google Meet",
            date: "4 April 2026",
            time: "7:30 PM - 8:30 PM"
        }
    ]
			  return (
              <>
              <div className={style.events}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={style.event}
                >
                    <h1>UPCOMING EVENTS</h1>
                    <div className={style.headerLine}></div>
                    <motion.div 
                      className={style.cards}
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.15 }
                        }
                      }}
                    >
                        {upcoming.map((event, index) => {
                            return (
                                <motion.div key={'up-'+index} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }} style={{ display: 'flex', flex: '1 1 350px', maxWidth: '500px' }}>
                                    <Upcoming title={event.title} host={event.host} location={event.location} date={event.date} time={event.time} reglink={event.reglink}></Upcoming>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={style.event}
                >
                    <h1>PAST EVENTS</h1>
                    <div className={style.headerLine}></div>
                    <motion.div 
                      className={style.cards}
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.15 }
                        }
                      }}
                    >
                    {past.map((event, index) => {
                            return (
                                <motion.div key={'pa-'+index} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }} style={{ display: 'flex', flex: '1 1 350px', maxWidth: '500px' }}>
                                    <Past title={event.title} host={event.host} location={event.location} date={event.date} time={event.time}></Past>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </motion.div>
              </div>
              </>
    );
}
