import { motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Peoplecard from '../Peoplecard/Peoplecard';
import Ihzan from '../../images/Ihzan.jpeg'
import './People.css';
import Nithin from '../../images/Nithin.jpeg'
import Gregory from '../../images/Gregory.jpeg'
import Gayatri from '../../images/Gayatri.jpeg'
import Soniya from '../../images/Soniya.jpeg'
import Rosemary from '../../images/Rosemary.jpeg'
import Dia from '../../images/Dia.jpeg'
const People = () => {
  const peopleArray = [
    {
      id: 1,
      name: "Ahammed Ihzan",
      designation: "Secretary",
      occupation: "2nd Year BSc Zoology, St Xavier's College Vaikom",
      email: "ahammedihzan79@gmail.com",
      phoneno: "7907081880",
      img: Ihzan
    },
    {
      id: 2,
      name: "Nithin Nandakumar",
      designation: "President",
      occupation: "MSc Botany Graduate, Maharajas College Ernakulam",
      email: "nthnnandakumar@gmail.com",
      phoneno: "6282390873",
      img: Nithin
    },
    {
      id: 3,
      name: "Georgy P Joseph",
      designation: "Joint Secretary",
      occupation: "1st Year MSc Zoology, Sacred Heart College Thevara",
      email: "georgypjoseph@gmail.com",
      phoneno: "8330886218",
      img: Gregory
    },
    {
      id: 4,
      name: "Gayatri Suresh Nair",
      designation: "Vice President",
      occupation: "1st Year BSc Zoology, NSS College Ottapalam",
      email: "igayatrisureshnair@gmail.com",
      phoneno: "7559871045",
      img: Gayatri
    },
    {
      id: 5,
      name: "K Soniya",
      designation: "Treasurer",
      occupation: "2nd Year MSc Zoology, Sree Narayana College Kannur",
      email: "soniyasuresh979@gmail.com",
      phoneno: "7510230483",
      img: Soniya
    },
    {
      id: 7,
      name: "Dia H",
      designation: "Board Member",
      occupation: "2nd Year BSc Zoology, Mar Ivanos College Thiruvananthapuram",
      email: "diahydros@gmail.com",
      phoneno: "9037753551",
      img: Dia
    },
    {
      id: 6,
      name: "Rosemary Raju",
      designation: "Board Member",
      occupation: "3rd Year BSc Zoology, Kuriakose Elias College Mannanam",
      email: "rosemaryraju2005@gmail.com",
      phoneno: "8078771220",
      img: Rosemary
    }
  ];

  return (
    <>
      <Navbar />
      <div className="people-page-container">
        <motion.div 
        className="people-banner"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="people-banner-title">Our Team</h1>
      </motion.div>
      <motion.div 
        className="people-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
          }
        }}
      >
        {peopleArray.map(person => (
          <motion.div
            key={person.id}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
          >
            <Peoplecard 
              name={person.name} 
              designation={person.designation} 
              img={person.img} 
              occupation={person.occupation}
              email={person.email}
              phoneno={person.phoneno}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
      <Footer />
    </>
  );
};

export default People;
