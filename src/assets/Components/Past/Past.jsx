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

            {props.isAdmin && (
                <div className={style.adminControls}>
                    <button onClick={() => props.onUpdate && props.onUpdate()} className={style.updateBtn} title="Edit Event">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 18.75a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Edit
                    </button>
                    <button onClick={() => props.onDelete && props.onDelete(props.id)} className={style.deleteBtn} title="Delete Event">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.78 0L9.24 9m4.77-9L19.5 6.38m-1.74 0a1.88 1.88 0 0 1-1.87 1.88H8.12A1.88 1.88 0 0 1 6.24 6.38m11.52 0V19.5a2.25 2.25 0 0 1-2.25 2.25H8.12A2.25 2.25 0 0 1 6.24 19.5V6.38M9 6.38V4.5a1.88 1.88 0 0 1 1.88-1.88h2.24A1.88 1.88 0 0 1 15 4.5v1.88" />
                        </svg>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}