import style from "./Ourevents.module.css"
import Upcoming from "../Upcoming/Upcoming"
import Past from "../Past/Past"
import {upcoming} from "../upcomarr"
import { motion } from "framer-motion"
import {useEffect} from "react"
import {useState} from "react"
import {eventsAPI} from "../../../utils/api"
export default function Ourevents() {

const [past, setPast] = useState([])
const [upcomingEvents, setUpcomingEvents] = useState([])
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const [upcomingData, pastData] = await Promise.all([
        eventsAPI.getUpcomingEvents(),
        eventsAPI.getPastEvents(currentPage)
      ]);
      setUpcomingEvents(upcomingData);
      setPast(pastData.events);
      setTotalPages(pastData.total);

    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchEvents();
}, [currentPage]);

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
                        {upcomingEvents.map((event, index) => {
                            return (
                                <div key={'up-'+index} style={{ display: 'flex', flex: '1 1 350px', maxWidth: '500px' }}>
                                    <Upcoming title={event.title} host={event.host} location={event.location} date={event.date} time={event.time} reglink={event.reglink}></Upcoming>
                                </div>
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
                                <div key={'pa-'+index} style={{ display: 'flex', flex: '1 1 350px', maxWidth: '500px' }}>
                                    <Past title={event.title} host={event.host} location={event.location} date={event.date} time={event.time}></Past>
                                </div>
                            )
                        })}
                    </motion.div>
                    <div className={style.pages}>
                            <button className={style.pagebtn} 
                            onClick={() => setCurrentPage(currentPage - 1)} 
                            disabled={currentPage === 1}>
                                PREV
                            </button>
                            <span className={style.pageNumber}>{currentPage}</span>
                            <button className={style.pagebtn} 
                            onClick={() => setCurrentPage(currentPage + 1)} 
                            disabled={currentPage === totalPages}>
                                NEXT
                            </button>
                        </div>
                </motion.div>
              </div>
              </>
    );
}
