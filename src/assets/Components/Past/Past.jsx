import style from "./Past.module.css"

export default function Past(props) {
    const dateParts = props.date ? props.date.replace(',', '').split(' ') : ['','',''];
    
    let day = "";
    let month = "";
    
    if (dateParts.length >= 2) {
        if (isNaN(parseInt(dateParts[0]))) {
            month = dateParts[0].substring(0,3).toUpperCase();
            day = parseInt(dateParts[1]);
        } else {
            day = dateParts[0];
            month = dateParts[1].substring(0,3).toUpperCase();
        }
    }

    return (
        <div className={style.card}>
            <div className={style.cardHeader}>
                <div className={style.dateBadge}>
                    <span className={style.month}>{month}</span>
                    <span className={style.day}>{day}</span>
                </div>
                <div className={style.eventInfoTop}>
                    <div className={style.location}>{props.location ? props.location.toUpperCase() : 'EVENT'}</div>
                    <div className={style.time}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {props.time}
                    </div>
                </div>
            </div>
            
            <div className={style.content}>
                <h3 className={style.title}>{props.title}</h3>
                <p className={style.description}>{props.host}</p>
            </div>
            
            <div className={style.footer}>
                <div className={style.badge}>COMPLETED</div>
            </div>
        </div>
    );
}