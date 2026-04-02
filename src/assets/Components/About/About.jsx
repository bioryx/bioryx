import Aboutcard from '../Aboutcard/Aboutcard';
import style from './About.module.css'
export default function About() {
                const whatwedo = [
                    {
                        title: "Academic Support",
                        description: "Study sessions, revision workshops, shared notes, and discussion forums."
                    },
                    {
                        title: "Scientific Conversations",
                        description: "Seminars, journal clubs, debates, and guest lectures on emerging topics in biology."
                    },
                    {
                        title: "Events & Outreach",
                        description: "Talks, exhibitions, competitions, and public science communication initiatives."
                    },
                    {
                        title: "Student Collaboration",
                        description: "Inter-college networking, project teams, mentorship, and research idea exchanges."
                    },]
                    const core =[
                    {
                        title: "Scientific Integrity",
                        description: "We prioritize evidence, transparency, and critical thinking."
                    },
                    {
                        title: "Collaboration",
                        description: "Progress grows through teamwork and shared perspectives."
                    },
                    {
                        title: "Respect for Life & Nature",
                        description: "We champion biodiversity, sustainability, and ecological responsibility."
                    },
                    {
                        title: "Lifelong Learning",
                        description: "Curiosity drives us-inside and outside the classroom."
                    },
                    {
                        title: "Inclusivity",
                        description: "We welcome students from all biological disciplines and backgrounds."
                    },
                    {
                        title: "Student Leadership",
                        description: "Bioryx is shaped by initiative, creativity, and collective effort."
                    }
                ]
			  return (
              <>
                    <div className={style.container}>
                        <header className={style.aboutus}>
                            <h1>ABOUT US</h1>
                            <p>
                            Bioryx is a student-run community created for biology enthusiasts across every domain of life sciences—from genetics and microbiology to ecology, botany, zoology, and conservation.
                            Founded on curiosity, collaboration, and respect for the living world, Bioryx provides a shared platform where students come together to explore ideas, strengthen academic skills, exchange research interests, and engage in thoughtful, science-driven conversations.
                            <br/><br />
                            We believe <b>biology is more than a subject.</b> It is a lens through which we understand life, protect biodiversity, and shape a sustainable future. Through discussions, study circles, field experiences, workshops, outreach programs, and student-led initiatives, Bioryx empowers emerging scientists to grow beyond textbooks and into real-world problem-solvers.
                            <br/><br />
                            <span className={style.highlight}>At its core, Bioryx is a space for learners who ask questions, think critically, and care deeply about the natural world.</span>
                            <br/><br />
                            <span className={style.tagline}>Bioryx — Where biology meets purpose</span>
                    
                            </p>
                        </header>
                        <main>
                            <div className={style.vision}>
                                <div className={style.visioncontainer}>
                                    <h1>VISION</h1>
                                    <p>To build a vibrant, inclusive network of young biologists who collaborate across disciplines, pursue scientific excellence, and contribute meaningfully to research, conservation, and environmental stewardship.</p>
                                </div>
                                <img src="https://www.treebo.com/blog/wp-content/uploads/2024/08/History-and-establishment.jpg" alt="" />
                            </div>
                            <div className={style.mission}>
                                <img src="https://www.treebo.com/blog/wp-content/uploads/2024/08/Nilgiri-Tahr-1024x675.jpg" alt="" />
                                <div className={style.missioncontainer}>
                                    <h1>MISSION</h1>
                                    <p>
                                    Create a collaborative platform for learning and dialogue in biological sciences that supports academic growth through peer-led study groups and shared resources. It encourages research-oriented thinking, promotes awareness of biodiversity and sustainability, and connects students passionate about shaping the future of biology.
                                    </p>
                                </div>
                            </div>
                        </main>
                        <div className={style.whatwedo}>
                            <h1>WHAT WE DO</h1>
                            <div className={style.cardcontainer}>
                                {whatwedo.map((whatwedo, index) => (
                                        <Aboutcard key={index} title={whatwedo.title} description={whatwedo.description}></Aboutcard>
                                ))}
                                                        
                            </div>
                        </div>
                        <div className={style.whatwedo}>
                            <h1>CORE VALUES</h1>
                            <div className={style.cardcontainer}>
                                {core.map((core, index) => (
                                        <Aboutcard key={index} title={core.title} description={core.description}></Aboutcard>
                                ))}
                                                        
                            </div>
                        </div>
                    </div>
              </>
);}