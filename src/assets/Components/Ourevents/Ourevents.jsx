import style from "./Ourevents.module.css"
import Upcoming from "../Upcoming/Upcoming"
import Past from "../Past/Past"
import { motion } from "framer-motion"
import {useEffect} from "react"
import {useState} from "react"
import {eventsAPI} from "../../../utils/api"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import {useRef} from "react"

export default function Ourevents() {

const [past, setPast] = useState([])
const [upcomingEvents, setUpcomingEvents] = useState([])
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [loading, setLoading] = useState(true);
const pastRef = useRef(null);

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
    setLoading(false);
  };

  fetchEvents();
}, [currentPage]);

useEffect(() => {
  if (pastRef.current) {
    pastRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [currentPage]);

const nextPage = () => {
  setCurrentPage(currentPage + 1);
};

const prevPage = () => {
  setCurrentPage(currentPage - 1);
};

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
                    {loading ? (
                        <div className={style.cards}>
                            {[...Array(2)].map((_, index) => (
                                <Skeleton key={index} height={200} width={350} />
                            ))}
                        </div>
                    ) : (
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
                    </motion.div>)}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={style.event}
                >
                    <h1 ref={pastRef}>PAST EVENTS</h1>
                    <div className={style.headerLine}></div>
                    
                    {loading?(
                        <div className={style.cards}>
                            {[...Array(9)].map((_, index) => (
                                <Skeleton key={index} height={200} width={350} />
                            ))}
                        </div>
                    ): (<motion.div 
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
                    </motion.div>)}
                    <div className={style.pages}>
                            <button className={style.pagebtn} 
                            disabled={currentPage === 1}
                            onClick={prevPage} 
                            >
                                PREV
                            </button>
                            <span className={style.pageNumber}>{currentPage}</span>
                            <button className={style.pagebtn} 
                            onClick={nextPage} 
                            disabled={currentPage === totalPages}>
                                NEXT
                            </button>
                        </div>
                </motion.div>
              </div>
              </>
    );
}
