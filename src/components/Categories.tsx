
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Thermal Bottles",
    description: "Keep your beverages at the perfect temperature",
    image: "https://images.unsplash.com/photo-1610631787330-c3eac43fbf60?w=600&auto=format&fit=crop&q=80",
    color: "bg-indigo-100/20",
    count: 12,
    path: "/shop"
  },
  {
    id: 2,
    name: "Sport Bottles",
    description: "Hydration companions for active lifestyles",
    image: "https://images.unsplash.com/photo-1612004285861-9e8bd32a4d9f?w=600&auto=format&fit=crop&q=80",
    color: "bg-teal-100/20",
    count: 8,
    path: "/shop"
  },
  {
    id: 3,
    name: "Glass Bottles",
    description: "Elegant designs with eco-friendly materials",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
    color: "bg-purple-100/20",
    count: 15,
    path: "/shop"
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
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Categories</h2>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
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
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link to={category.path}>
                <Card className="h-full overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className={`aspect-square relative overflow-hidden ${category.color}`}>
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover object-center"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-indigo-900/60 to-purple-800/60 text-white">
                    <h3 className="font-semibold text-xl group-hover:text-indigo-200 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-indigo-100/90 mt-2">{category.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-indigo-100/70">{category.count} products</span>
                      <span className="text-indigo-200 font-medium group-hover:translate-x-1 transition-transform duration-300">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
