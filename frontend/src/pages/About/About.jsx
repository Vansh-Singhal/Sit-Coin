import { motion } from "framer-motion";
import { FaUserTie, FaCode, FaLightbulb, FaCogs } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const About = () => {
  return (
    <>
      <Header />
      <AboutMain />
      <Footer />
    </>
  );
};

const AboutMain = () => {
  return (
    <div className="text-white min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92]">
      {/* New Hero Section with technical dotted font */}
      <motion.section
        className="py-20 px-4 bg-white/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#000428] ">
            About Us
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto ">
            We're on a mission to revolutionize the digital landscape through
            innovation and creativity.
          </p>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <TeamMemberCard
              name="Arihant Gupta"
              role="Product Manager"
              description="Arihant leads the vision and strategy, bridging the gap between design and technology to ensure an outstanding product experience."
              icon={<FaUserTie className="w-8 h-8" />}
              university="Student, Bennett University"
            />
            <TeamMemberCard
              name="Vansh Singhal"
              role="Fullstack Developer"
              description="Driving both the front-end and back-end, Vansh brings innovative ideas to life with code that powers seamless experiences."
              icon={<FaCode className="w-8 h-8" />}
              university="Student, Bennett University"
            />
          </div>
        </div>
      </motion.section>

      {/* Mission Section with Fade-in Animation */}
      <motion.section
        className="py-16 px-4 bg-blue-900/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto text-center">
          <motion.h2 className="text-4xl font-bold mb-8" variants={fadeInUp}>
            Our Mission
          </motion.h2>
          <motion.p
            className="text-xl max-w-4xl mx-auto mb-12"
            variants={fadeInUp}
          >
            We strive to revolutionize the digital payment landscape through
            innovative technology, robust security, and seamless user
            experiences. By simplifying payment processes and fostering
            creativity, we empower users and redefine the future of
            transactions.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            <ValueCard
              icon={<FaLightbulb className="w-6 h-6" />}
              title="Innovation"
              description="Pushing the boundaries of payment technology with features like payment reversals."
            />
            <ValueCard
              icon={<FaCogs className="w-6 h-6" />}
              title="Simplification"
              description="Making digital payments accessible and user-friendly for everyone."
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

const TeamMemberCard = ({ name, role, description, icon, university }) => {
  return (
    <motion.div
      className="opacity-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <Card className="bg-white/10 backdrop-blur-sm border-none">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-blue-400">{icon}</div>
            <div>
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-blue-400">{role}</p>
            </div>
          </div>
          <p className="mb-4 text-gray-200">{description}</p>
          <p className="text-sm text-gray-300">{university}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ValueCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-lg p-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="text-blue-400 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default About;
