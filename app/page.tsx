"use client";
import { useMemo, useState } from "react";
import { useMounted } from './mounted'
const words: string[] = ["Apple", "Brave", "Clean", "Dance", "Eagle", "Frost", "Grace", "Honey", "Input", "Joker", "Knack", "Lemon", "Mirth", "Nerve", "Opine", "Peace", "Query", "Rally", "Scale", "Trust"].map(word => word.toLocaleLowerCase());

const wordGenerator = (): string => { 
  return words[Math.floor(Math.random() * words.length)].toLocaleLowerCase();
}

export default function Home() {
  const [value, setValue] = useState("");
  const chosenWord = useMemo(() => wordGenerator(), []);
  const [currentRow, setCurrentRow] = useState(-1);
  const [currentWord, setCurrentWord] = useState("");
  const [dict, setDict] = useState<string[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [wordleMax, setWordleMax] = useState(false);
  console.log(chosenWord, 'chosen word')
  const mounted = useMounted()

  if (!mounted) {
    return <div className='h-screen flex items-center justify-center'>
      <h1 className='text-3xl'>Loading...</h1>
    </div>
  }

  return (  
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Grid word={chosenWord} currentRow={currentRow} currentWord={currentWord} dict={dict} />
        <h1 className='text-red-700'>{notFound ? "Word not found in dictionary" : ''}</h1>
        <h1 className='text-red-700'>{wordleMax ? "Worlde Maxed out, please refresh and try again!" : ''}</h1>
        <div>
          <input
            type="text"
            placeholder="type words here"
            className="text-black"
            value={value}
            maxLength={5}
            onChange={(e) => {
              console.log(e.target.value);
              setValue(e.target.value);
            }}
          />
          <button onClick={() => {
            if (!words.includes(value.toLocaleLowerCase())) {
              setNotFound(true);
              return;
            }
            if (currentRow === 5) {
              setWordleMax(true);
              return;
            }
            setCurrentWord(value.toLocaleLowerCase());
            setCurrentRow(currentRow + 1);
            setDict([...dict, value.toLocaleLowerCase()]);
            setNotFound(false);
            
          }}>Submit</button>
        </div>
    </main>
  );
}


const Grid = ({ word, currentWord, currentRow, dict }: { word: string, currentWord: string, currentRow: number, dict: string[] }) => {;
  return (
    <div className="grid grid-cols-5 gap-1">
      <Row currentWord={currentRow === 0 ? currentWord : dict[0] ? dict[0] :''} chosenWord={word} />
      <Row currentWord={currentRow === 1 ? currentWord : dict[1] ? dict[1] : ''} chosenWord={word} />
      <Row currentWord={currentRow === 2 ? currentWord : dict[2] ? dict[2] : ''} chosenWord={word} />  
      <Row currentWord={currentRow === 3 ? currentWord : dict[3] ? dict[3] : ''} chosenWord={word} />
      <Row currentWord={currentRow === 4 ? currentWord : dict[4] ? dict[4] : ''} chosenWord={word} />
      <Row currentWord={currentRow === 5 ? currentWord : dict[5] ? dict[5] : ''} chosenWord={word} />
    </div>
  );
};


const Row = ({ currentWord, chosenWord }: { currentWord: string, chosenWord: string }) => {
  return (
    <>
      <div className={`${currentWord.charAt(0) === chosenWord.charAt(0) ? 'w-12 h-12 text-center bg-green-400' : chosenWord.split('').find(letter => letter === currentWord.charAt(0)) ? 'w-12 h-12 text-center bg-blue-700' : 'w-12 h-12 text-center bg-red-700'}`}>{currentWord.charAt(0)}</div>
      <div className={`${currentWord.charAt(1) === chosenWord.charAt(1) ? 'w-12 h-12 text-center bg-green-400' : chosenWord.split('').find(letter => letter === currentWord.charAt(1)) ? 'w-12 h-12 text-center bg-blue-700' : 'w-12 h-12 text-center bg-red-700'}`}>{currentWord.charAt(1)}</div>
      <div className={`${currentWord.charAt(2) === chosenWord.charAt(2) ? 'w-12 h-12 text-center bg-green-400' : chosenWord.split('').find(letter => letter === currentWord.charAt(2)) ? 'w-12 h-12 text-center bg-blue-700' : 'w-12 h-12 text-center bg-red-700'}`}>{currentWord.charAt(2)}</div>
      <div className={`${currentWord.charAt(3) === chosenWord.charAt(3) ? 'w-12 h-12 text-center bg-green-400' : chosenWord.split('').find(letter => letter === currentWord.charAt(3)) ? 'w-12 h-12 text-center bg-blue-700' : 'w-12 h-12 text-center bg-red-700'}`}>{currentWord.charAt(3)}</div>
      <div className={`${currentWord.charAt(4) === chosenWord.charAt(4) ? 'w-12 h-12 text-center bg-green-400' : chosenWord.split('').find(letter => letter === currentWord.charAt(4)) ? 'w-12 h-12 text-center bg-blue-700' : 'w-12 h-12 text-center bg-red-700'}`}>{currentWord.charAt(4)}</div>
    </>
  );
};