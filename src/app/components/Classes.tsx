import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const classes = [
  {
    title: "Strength Training",
    description: "Build muscle and increase power with expert-led strength sessions.",
    image: "https://images.unsplash.com/photo-1770493895453-4f758c40d11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MTQ3NTM2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "45 min"
  },
  {
    title: "Yoga & Flexibility",
    description: "Improve balance, flexibility, and mindfulness through yoga practice.",
    image: "https://images.unsplash.com/photo-1619781458519-5c6115c0ee98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwY2xhc3MlMjBncm91cHxlbnwxfHx8fDE3NzE0ODcwODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "60 min"
  },
  {
    title: "Cardio Blast",
    description: "High-energy cardio workouts to burn calories and boost endurance.",
    image: "https://images.unsplash.com/photo-1761971974992-6df33df97c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW8lMjBydW5uaW5nJTIwdHJlYWRtaWxsfGVufDF8fHx8MTc3MTQ1NDA1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "30 min"
  }
];

export function Classes() {
  return (
    <section id="classes" className="py-20 scroll-mt-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Our Classes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from a variety of classes designed to meet your fitness
            needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  {classItem.duration}
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="mb-3">{classItem.title}</h3>
                <p className="text-gray-600">{classItem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
