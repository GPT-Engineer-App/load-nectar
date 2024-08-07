import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star, Facebook, Twitter, Instagram, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const catBreeds = [
  { name: "Siamese", description: "Vocal and social cats known for their distinctive coloring.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", personality: "Talkative, intelligent, and affectionate" },
  { name: "Persian", description: "Long-haired cats with a sweet, gentle nature.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", personality: "Calm, quiet, and dignified" },
  { name: "Maine Coon", description: "Large, friendly cats often referred to as 'gentle giants'.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", personality: "Friendly, playful, and good with families" },
  { name: "British Shorthair", description: "Round-faced cats with a calm and easygoing temperament.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg", personality: "Easygoing, patient, and undemanding" },
  { name: "Sphynx", description: "Hairless cats known for their extroverted and energetic personality.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg", personality: "Energetic, mischievous, and attention-seeking" },
];

const catFacts = [
  "Cats have over 20 vocalizations, including the meow, purr, and chirp.",
  "A group of cats is called a 'clowder'.",
  "Cats spend 70% of their lives sleeping.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to 6 times their length.",
];

const quizQuestions = [
  {
    question: "How many hours a day do cats typically sleep?",
    options: ["8-10 hours", "12-14 hours", "16-20 hours"],
    correctAnswer: "16-20 hours"
  },
  {
    question: "What is a group of cats called?",
    options: ["A pride", "A clowder", "A pack"],
    correctAnswer: "A clowder"
  },
  {
    question: "Which of these is NOT a cat breed?",
    options: ["Siamese", "Labrador", "Persian"],
    correctAnswer: "Labrador"
  }
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [personalityAnswers, setPersonalityAnswers] = useState({});
  const [matchedBreed, setMatchedBreed] = useState(null);
  const [quizProgress, setQuizProgress] = useState(0);
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

  const handleQuizAnswer = (answer) => {
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setQuizScore(quizScore + 1);
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizScore(0);
    setCurrentQuestionIndex(0);
    setShowQuizResult(false);
  };

  const handlePersonalityAnswer = (question, answer) => {
    setPersonalityAnswers({ ...personalityAnswers, [question]: answer });
  };

  const matchPersonality = () => {
    // Simple matching algorithm (can be improved for more accuracy)
    const scores = catBreeds.map(breed => {
      let score = 0;
      if (personalityAnswers.activity === "high" && breed.personality.includes("energetic")) score++;
      if (personalityAnswers.activity === "low" && breed.personality.includes("calm")) score++;
      if (personalityAnswers.affection === "high" && breed.personality.includes("affectionate")) score++;
      if (personalityAnswers.vocal === "yes" && breed.personality.includes("talkative")) score++;
      return { breed, score };
    });
    const bestMatch = scores.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    setMatchedBreed(bestMatch.breed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.div 
        className="bg-cover bg-center h-screen flex items-center justify-center relative overflow-hidden"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.h1 
            className="text-7xl font-bold text-white mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Cat className="inline-block mr-2" /> Feline Fascination
          </motion.h1>
          <p className="text-2xl text-white mb-8">Discover the Purr-fect World of Cats</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Explore Now <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <div className="max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">Popular Cat Breeds</h2>
          <Carousel className="mb-16">
            <CarouselContent>
              {catBreeds.map((breed, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    whileHover={{ scale: 1.05, zIndex: 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="overflow-hidden h-full">
                      <CardContent className="p-0 relative">
                        <img
                          src={breed.image}
                          alt={breed.name}
                          className="mx-auto object-cover w-full h-[300px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                          <CardTitle className="text-2xl mb-2">{breed.name}</CardTitle>
                          <CardDescription className="text-gray-200 mb-2">{breed.description}</CardDescription>
                          <p className="text-sm">{breed.personality}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs defaultValue="characteristics" className="mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
              <TabsTrigger value="quiz">Cat Quiz</TabsTrigger>
              <TabsTrigger value="personality">Personality Matcher</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Feline Features</CardTitle>
                  <CardDescription>Discover what makes cats unique</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Excellent hunters with sharp claws and teeth",
                      "Flexible bodies and quick reflexes",
                      "Keen senses, especially hearing and night vision",
                      "Communicate through vocalizations, body language, and scent"
                    ].map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }} 
                        className="flex items-center p-4 bg-purple-100 rounded-lg shadow-md"
                      >
                        <Paw className="mr-4 text-purple-500" size={24} />
                        <span className="text-lg">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="quiz">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Cat Trivia Quiz</CardTitle>
                  <CardDescription>Test your feline knowledge</CardDescription>
                </CardHeader>
                <CardContent>
                  {!showQuizResult ? (
                    <motion.div
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-semibold mb-4">Question {currentQuestionIndex + 1}</h3>
                      <p className="text-lg mb-6">{quizQuestions[currentQuestionIndex].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={() => handleQuizAnswer(option)}
                              className="w-full text-lg py-6"
                              variant="outline"
                            >
                              {option}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                      <Progress value={quizProgress} className="mt-8" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-3xl font-bold mb-4">Quiz Complete!</h3>
                      <p className="text-xl mb-4">Your score: {quizScore} out of {quizQuestions.length}</p>
                      <Progress value={(quizScore / quizQuestions.length) * 100} className="mb-6" />
                      <Button onClick={resetQuiz} className="mt-4" size="lg">Try Again</Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="personality">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Find Your Purr-fect Match</CardTitle>
                  <CardDescription>Answer a few questions to discover your ideal cat companion</CardDescription>
                </CardHeader>
                <CardContent>
                  {!matchedBreed ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {["activity", "affection", "vocal"].map((question, index) => (
                        <motion.div 
                          key={question} 
                          className="mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Label className="text-lg font-semibold mb-2 block">
                            {question === "activity" && "How active do you want your cat to be?"}
                            {question === "affection" && "Do you want an affectionate cat?"}
                            {question === "vocal" && "Do you prefer a vocal cat?"}
                          </Label>
                          <RadioGroup 
                            onValueChange={(value) => handlePersonalityAnswer(question, value)}
                            className="flex space-x-4"
                          >
                            {["low", "high"].map((value) => (
                              <div key={value} className="flex items-center">
                                <RadioGroupItem value={value} id={`${question}-${value}`} className="peer sr-only" />
                                <Label
                                  htmlFor={`${question}-${value}`}
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  {value === "low" ? "Low" : "High"}
                                  {question === "activity" && (value === "low" ? "🐱" : "🐱‍👤")}
                                  {question === "affection" && (value === "low" ? "😺" : "😻")}
                                  {question === "vocal" && (value === "low" ? "😽" : "😸")}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </motion.div>
                      ))}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button onClick={matchPersonality} size="lg" className="w-full">Find My Match</Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-semibold mb-4">Your Purr-fect Match: {matchedBreed.name}</h3>
                      <img src={matchedBreed.image} alt={matchedBreed.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                      <p className="mb-2">{matchedBreed.description}</p>
                      <p className="mb-4"><strong>Personality:</strong> {matchedBreed.personality}</p>
                      <Button onClick={() => setMatchedBreed(null)} className="w-full">Try Again</Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-100 to-pink-100">
            <CardHeader>
              <CardTitle className="flex items-center text-3xl font-bold">
                <Info className="mr-2 text-purple-500" size={28} /> Did You Know?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFactIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 rounded-lg shadow-md mb-6"
                >
                  <p className="text-xl text-gray-800 italic">"{catFacts[currentFactIndex]}"</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleLike} variant="outline" size="lg" className="flex items-center">
                    <Heart className="mr-2 text-red-500" /> Love This Fact ({likes})
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="flex items-center" onClick={() => setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length)}>
                    <Star className="mr-2 text-yellow-500" /> Next Fact
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <footer className="bg-purple-800 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">Feline Fascination</h3>
              <p className="text-lg">Exploring the wonderful world of cats</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-300 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Cat Breeds</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Cat Care Tips</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-pink-300 transition-colors"><Facebook size={24} /></a>
                <a href="#" className="hover:text-pink-300 transition-colors"><Twitter size={24} /></a>
                <a href="#" className="hover:text-pink-300 transition-colors"><Instagram size={24} /></a>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-purple-600" />
          <div className="text-center">
            <p>&copy; 2024 Feline Fascination. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
