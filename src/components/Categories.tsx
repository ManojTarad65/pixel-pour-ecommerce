
import { motion } from 'framer-motion';
import { Card } from './ui/card';

const categories = [
  {
    id: 1,
    name: "Thermal Bottles",
    description: "Keep your beverages at the perfect temperature",
    image: "https://images.unsplash.com/photo-1610631787330-c3eac43fbf60?w=600&auto=format&fit=crop",
    color: "bg-blue-100",
    count: 12
  },
  {
    id: 2,
    name: "Sport Bottles",
    description: "Hydration companions for active lifestyles",
    image: "https://images.unsplash.com/photo-1612004285861-9e8bd32a4d9f?w=600&auto=format&fit=crop",
    color: "bg-green-100",
    count: 8
  },
  {
    id: 3,
    name: "Glass Bottles",
    description: "Elegant designs with eco-friendly materials",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop",
    color: "bg-purple-100",
    count: 15
  },
];

const Categories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Explore Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the perfect bottle for your lifestyle from our curated collections.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {categories.map((category, idx) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Card className="h-full overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <div className={`aspect-square relative overflow-hidden ${category.color}`}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-navy-800 group-hover:text-bottle-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{category.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{category.count} products</span>
                    <span className="text-bottle-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Explore →
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
