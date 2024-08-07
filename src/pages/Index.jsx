import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star, Facebook, Twitter, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      <div className="bg-cover bg-center h-96 flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <motion.h1 
          className="text-6xl font-bold text-white shadow-lg p-4 bg-black bg-opacity-50 rounded"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Cat className="inline-block mr-2" /> Feline Fascination
        </motion.h1>
      </div>
      
      <div className="max-w-4xl mx-auto p-8">
        <Carousel className="mb-8">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 relative">
                      <img
                        src={breed.image}
                        alt={breed.name}
                        className="mx-auto object-cover w-full h-[400px]"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                        <CardTitle>{breed.name}</CardTitle>
                        <CardDescription className="text-gray-200">{breed.description}</CardDescription>
                        <p className="mt-2 text-sm">{breed.personality}</p>
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

        <Tabs defaultValue="characteristics" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="quiz">Cat Quiz</TabsTrigger>
            <TabsTrigger value="personality">Personality Matcher</TabsTrigger>
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
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle>Cat Trivia Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                {!showQuizResult ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Question {currentQuestionIndex + 1}</h3>
                    <p className="mb-4">{quizQuestions[currentQuestionIndex].question}</p>
                    {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleQuizAnswer(option)}
                        className="mr-2 mb-2"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quiz Complete!</h3>
                    <p>Your score: {quizScore} out of {quizQuestions.length}</p>
                    <Button onClick={resetQuiz} className="mt-4">Try Again</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="personality">
            <Card>
              <CardHeader>
                <CardTitle>Find Your Purr-fect Match</CardTitle>
              </CardHeader>
              <CardContent>
                {!matchedBreed ? (
                  <div>
                    <div className="mb-4">
                      <Label>How active do you want your cat to be?</Label>
                      <RadioGroup onValueChange={(value) => handlePersonalityAnswer("activity", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="activity-low" />
                          <Label htmlFor="activity-low">Low</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="activity-high" />
                          <Label htmlFor="activity-high">High</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="mb-4">
                      <Label>Do you want an affectionate cat?</Label>
                      <RadioGroup onValueChange={(value) => handlePersonalityAnswer("affection", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="affection-low" />
                          <Label htmlFor="affection-low">Not very</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="affection-high" />
                          <Label htmlFor="affection-high">Very</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="mb-4">
                      <Label>Do you prefer a vocal cat?</Label>
                      <RadioGroup onValueChange={(value) => handlePersonalityAnswer("vocal", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="vocal-no" />
                          <Label htmlFor="vocal-no">No</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="vocal-yes" />
                          <Label htmlFor="vocal-yes">Yes</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Button onClick={matchPersonality}>Find My Match</Button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Your Purr-fect Match: {matchedBreed.name}</h3>
                    <p>{matchedBreed.description}</p>
                    <p className="mt-2">Personality: {matchedBreed.personality}</p>
                    <Button onClick={() => setMatchedBreed(null)} className="mt-4">Try Again</Button>
                  </div>
                )}
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
      </div>

      <footer className="bg-purple-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Feline Fascination</h3>
              <p>Exploring the wonderful world of cats</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-300"><Facebook /></a>
              <a href="#" className="hover:text-pink-300"><Twitter /></a>
              <a href="#" className="hover:text-pink-300"><Instagram /></a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 Feline Fascination. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
