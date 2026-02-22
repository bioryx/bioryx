import style from "./Ourevents.module.css"
import Upcoming from "../Upcoming/Upcoming"
import Past from "../Past/Past"
import {upcoming} from "../upcomarr"
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
        time: "7:30 PM - 8:30 PM",
        reglink:"https://forms.gle/MbnZtj44PtDZn5BW7"
    }
    ]
			  return (
              <>
              <div className={style.events}>
                <div className={style.event}>
                    <h1>UPCOMING EVENTS</h1>
                    <div className={style.cards}>
                        {upcoming.map((event, index) => {
                            return (
                                <Upcoming key={index} title={event.title} host={event.host} location={event.location} date={event.date} time={event.time} reglink={event.reglink}></Upcoming>
                            )
                        })}
                    </div>
                </div>
                <div className={style.event}>
                    <h1>PAST EVENTS</h1>
                    <div className={style.cards}>
                    {past.map((event, index) => {
                            return (
                                <Past key={index} title={event.title} host={event.host} location={event.location} date={event.date} time={event.time}></Past>
                            )
                        })}
                    </div>
                </div>
              </div>
              </>);}
