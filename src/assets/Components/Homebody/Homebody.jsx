import style from './Homebody.module.css'
export default function Homebody() {
    return(
        <>
        <div className={style.biomain}>
            <div className={style.biocard}>
                <div className={style.biotext}>
                    <h1>BIORYX</h1>
                    <p>Bioryx is a student-run community for biology students interested in all fields of biological science, from genetics and microbiology to ecology, botany, zoology, and conservation. It’s a shared space for academic discussions, study resources, field experiences, event updates, and science-based conversations.</p>
                </div>
                <img src="https://www.fauna-flora.org/wp-content/uploads/2017/06/naturepl_00568429.jpg" alt="" />
            </div>
            <div className={style.biocard2}>
                <img src="https://i.pinimg.com/1200x/f2/e9/1a/f2e91a50ad0252a5731ec44444fa3b62.jpg" alt="" />
                <div className={style.biotext2}>
                    <p>Built on curiosity and respect for life sciences, Bioryx connects students to learn together, exchange ideas, and promote scientific thinking and environmental awareness.</p>
                    <ul>
                        <li>learn collaboratively</li>
                        <li>think scientifically</li>
                        <li>grow as biologists</li>
                    </ul>
                </div>
            </div>
            <div className={style.biobot}>
                <h1>Bioryx - Where biology meets purpose...</h1>
            </div>
        </div>
        </>
    )
}