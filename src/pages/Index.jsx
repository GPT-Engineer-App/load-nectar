import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const catBreeds = [
  { name: "Siamese", description: "Vocal and social cats known for their distinctive coloring.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", description: "Long-haired cats with a sweet, gentle nature.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", description: "Large, friendly cats often referred to as 'gentle giants'.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "British Shorthair", description: "Round-faced cats with a calm and easygoing temperament.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  { name: "Sphynx", description: "Hairless cats known for their extroverted and energetic personality.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
];

const catFacts = [
  "Cats have over 20 vocalizations, including the meow, purr, and chirp.",
  "A group of cats is called a 'clowder'.",
  "Cats spend 70% of their lives sleeping.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to 6 times their length.",
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: "You're pawsome! 🐾",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          className="text-6xl font-bold mb-6 flex items-center justify-center text-purple-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Cat className="mr-2 text-pink-500" /> Feline Fascination
        </motion.h1>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-0">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="mx-auto object-cover w-full h-[400px] rounded-t-lg"
                    />
                  </CardContent>
                  <CardHeader>
                    <CardTitle>{breed.name}</CardTitle>
                    <CardDescription>{breed.description}</CardDescription>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Tabs defaultValue="characteristics" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle>Feline Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <motion.li whileHover={{ scale: 1.05 }} className="flex items-center"><Paw className="mr-2 text-pink-500" /> Excellent hunters with sharp claws and teeth</motion.li>
                  <motion.li whileHover={{ scale: 1.05 }} className="flex items-center"><Paw className="mr-2 text-pink-500" /> Flexible bodies and quick reflexes</motion.li>
                  <motion.li whileHover={{ scale: 1.05 }} className="flex items-center"><Paw className="mr-2 text-pink-500" /> Keen senses, especially hearing and night vision</motion.li>
                  <motion.li whileHover={{ scale: 1.05 }} className="flex items-center"><Paw className="mr-2 text-pink-500" /> Communicate through vocalizations, body language, and scent</motion.li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle>Cat Breeds Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catBreeds.map((breed, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{breed.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{breed.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="mr-2 text-blue-500" /> Did You Know?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFactIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-gray-700 mb-4"
              >
                {catFacts[currentFactIndex]}
              </motion.p>
            </AnimatePresence>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleLike} variant="outline" className="flex items-center">
                <Heart className="mr-2 text-red-500" /> Show Some Love ({likes})
              </Button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="outline" className="flex items-center" onClick={() => setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length)}>
                  <Star className="mr-2 text-yellow-500" /> Next Fact
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
