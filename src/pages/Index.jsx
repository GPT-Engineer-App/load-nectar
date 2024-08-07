import { useState } from "react";
import { Cat, Heart, Info, Paw } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const catBreeds = [
  { name: "Siamese", description: "Vocal and social cats known for their distinctive coloring." },
  { name: "Persian", description: "Long-haired cats with a sweet, gentle nature." },
  { name: "Maine Coon", description: "Large, friendly cats often referred to as 'gentle giants'." },
  { name: "British Shorthair", description: "Round-faced cats with a calm and easygoing temperament." },
  { name: "Sphynx", description: "Hairless cats known for their extroverted and energetic personality." },
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const { toast } = useToast();

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
        <h1 className="text-5xl font-bold mb-6 flex items-center justify-center text-purple-800">
          <Cat className="mr-2 text-pink-500" /> Feline Fascination
        </h1>
        <Card className="mb-8">
          <CardContent className="p-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
              alt="A cute cat"
              className="mx-auto object-cover w-full h-[400px] rounded-t-lg"
            />
          </CardContent>
          <CardHeader>
            <CardDescription className="text-xl text-center text-gray-700">
              Cats: Nature's perfect blend of grace, mystery, and adorable mischief.
            </CardDescription>
          </CardHeader>
        </Card>

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
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Excellent hunters with sharp claws and teeth</li>
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Flexible bodies and quick reflexes</li>
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Keen senses, especially hearing and night vision</li>
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Communicate through vocalizations, body language, and scent</li>
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
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{breed.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{breed.description}</p>
                      </CardContent>
                    </Card>
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
            <p className="text-lg text-gray-700 mb-4">
              Cats have been domesticated for over 9,000 years and were once worshipped as gods in ancient Egypt!
            </p>
            <div className="flex justify-center">
              <Button onClick={handleLike} variant="outline" className="flex items-center">
                <Heart className="mr-2 text-red-500" /> Show Some Love ({likes})
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
