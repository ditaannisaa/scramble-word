import { 
    Box,
    Card,
    CardHeader,
    Heading,
    CardBody,
    CardFooter,
    Button,
    Text,
    Input
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Words = [
    "Strawberry",
    "Avocado",
    "Banana",
    "Orange",
    "Apple",
    "Mango",
]

function WordScramble() {
    const [inputValue, setInputValue] = useState("")
    const [isPlayOn, setIsPlayOn] = useState(false)
    const [correctWord, setCorrectWord] = useState("")
    const [scrambledWord, setScrambledWord] = useState('')
    const [message, setMessage] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
        setInputValue(event.target.value.toUpperCase())
    }

    const selectWord = () => {
        const randomIndex = Math.floor(Math.random() * Words.length);
        const startWord = Words[randomIndex];

        return startWord;
    }

    const handleButtonClick = () => {
        console.log("clicked")

        if (inputValue !== "") {
            if (correctWord === inputValue) {
                handleStartGame();
            } else {
                setMessage("Wrong Answer");
            }
        }
    }

    const handleStartGame = () => {
        setIsPlayOn(true)
        setInputValue("")
        setMessage('')

        const word = selectWord()
        setCorrectWord(word.toUpperCase())
        setScrambledWord(constructScrambledWord(word))
    }

    const constructScrambledWord = (word: string) => {
        const shuffleArray = word.split('');
        for (let i = shuffleArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];

        }

        return shuffleArray.join("")
    }

    useEffect(() => {
        let clearMessage: number;
        if (message === "Wrong Answer") {
            clearMessage = setTimeout(() => setMessage(''), 800);
        }
        return () => {
            if (clearMessage) {
                clearTimeout(clearMessage);
            }
        };
    }, [])

  return (
    <Box bg='blue.800' padding={'20px'} display={'flex'} justifyContent={'center'} flexWrap={'wrap'} w={'full'} >
        <Box  border={6} m={6} p={4} gap={4} >
            <Card bg='blue.50' >
                <CardHeader m='0 auto'>
                    <Heading >Word Scramble</Heading>
                </CardHeader>

                
                {isPlayOn ?(
                    <>
                    <CardBody m='0 auto'>
                    <Box gap={6}  >
                        <Box display='flex' justifyContent='center' bg='black' my={4}>
                            {!!message && (
                               <Text color='white'>{message}</Text> 
                            )}
                        </Box>
                        <Box display='flex' gap={4}>
                            {correctWord.split("").map((el, i) => (
                                
                                <Text 
                                w='40px' 
                                h='40px' 
                                bg='gray.200'
                                m='0 auto'
                                key={`${el}_${i}`} 
                                >
                                {inputValue[i]}
                                </Text>
                            ))}
                            
                        </Box>
                        <Box display='flex' justifyContent='center'>
                           <Text className='scramble_word' gap={2}>{scrambledWord}</Text> 
                        </Box>
                        
                    </Box>
                    
                    </CardBody>
                   <CardFooter m='0 auto' gap={6} >
                        <Input
                        w='sm'
                        placeholder="Your Answer"
                        onChange={handleInputChange}
                        value={inputValue}

                        />
                        <Button   
                        bg="teal.300"
                        onClick={handleButtonClick}
                        >
                            Submit
                        </Button>
                        
                    </CardFooter> 
                    </>
                ) : (
                    <Box  display='flex' justifyContent='center' p={6} border={6}>
                        <Button m='auto' bg='green.400' color='white' onClick={handleStartGame}>Start Game</Button>
                    </Box>
                )}
                
                {isPlayOn && (
                    <Box  display='flex' justifyContent='center' p={6} border={6}>
                        <Button m='auto' bg='green.400' color='white' onClick={handleStartGame}>New Game</Button>
                    </Box>
                ) }
                
            </Card>
            
            
        </Box>
    </Box>
  )
}

export default WordScramble