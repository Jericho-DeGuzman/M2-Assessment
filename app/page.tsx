'use client'
import Image from 'next/image'
import Navbar from './_components/Navbar'
import Choice from './_components/Choice'
import questionaire from '@/src/questionaire'
import { Suspense, useEffect, useState } from 'react'
import { Questions } from '@/types/Questions'
import { shuffleQuestions } from '@/utils/ShuffleQuestion'
import Skeleton from './_components/Skeleton'
import getResult from '@/utils/GetResult'
import Modal from './_components/Modal'

interface Result {
  a: number;
  b: number;
  c: number;
  result: string;
};

export default function Home() {
  // answers.
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [questions, setQuestions] = useState<Questions[]>([])
  // to answer the question 1 by 1.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  // progress.
  const [progress, setProgress] = useState<number>(1);
  // current answer. 
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<Result>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // initialize questions.
  useEffect(() => {
    const getQuestion = async () => {
      const _questions = await shuffleQuestions(questionaire);
      setQuestions(_questions);
    };

    const initializeQuestions = async () => {
      await getQuestion();
      handleSkeleton();
    };

    initializeQuestions();
  }, [])

  // next button even handler.
  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    // check if user choose.
    if (!answers[questions[currentQuestionIndex].id]) return setShowAlert(true);
    setLoading(true);
    if (currentQuestionIndex == questions.length - 1) { return checkResult() };
    // set answer to null for the next question.
    setCurrentAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setProgress(progress + 1);
    handleSkeleton();
  }

  // onchange radio handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswers((prevData) => ({
      ...prevData,
      [questions[currentQuestionIndex].id]: value,
    }))

  }

  // handle skeleton loading.
  const handleSkeleton = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // get result handler 
  const checkResult = async () => {
    const result = await getResult(answers);
    setResult(result);
  }

  const handleRetry = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Reset all state variables to their initial values
    setAnswers({});
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setProgress(1);
    setCurrentAnswer(null);
    setLoading(true);
    setResult(undefined);
  
    // Fetch new set of questions and initialize the component
    const getQuestion = async () => {
      const _questions = await shuffleQuestions(questionaire);
      setQuestions(_questions);
    };

    const initializeQuestions = async () => {
      await getQuestion();
      handleSkeleton();
    };

    initializeQuestions();
  };
  

  return (
    <>
      <div className='w-full'>
        {showAlert && <Modal open={showAlert} onclick={() => setShowAlert(false)}/>}
        <Navbar progress={progress} />
        <div className='w-full h-full items-center py-12'>
          <header className='w-full flex justify-center px-6 mt-4'>
            {result ? (
              <>
                <h1 className='w-6/12 font-bold text-lg'>
                  Successfully Completed. 🎉🙌
                </h1>
              </>
            ) : (
              <h1 className='w-6/12 font-bold text-lg'>
                The questions will be display randomly.
              </h1>
            )}
          </header>
          <main className='w-full flex justify-center px-6 py-4'>
            {result ? (
              <>
                <div className='w-6/12'>
                  <h1 className='font-bold'>Result:</h1>
                  <div className='border-2 rounded-md p-6 text-center my-4'>
                    {result.result}
                    <div className='mt-4'>
                      <p className='text-sm'><strong>count(a): </strong> {result.a}</p>
                      <p className='text-sm'><strong>count(b): </strong> {result.b}</p>
                      <p className='text-sm'><strong>count(c): </strong> {result.c}</p>
                      <p className='text-sm'><strong>Total Answers: </strong> {result.c + result.b + result.a}</p>
                    </div>
                  </div>

                  <div className='flex justify-center my-4'>
                    <button className='btn btn-sm btn-accent text-white' onClick={handleRetry}>Retry</button>
                  </div>
                </div>
              </>
            ) : (
              loading ? <Skeleton /> : (
                <div className='w-6/12'>
                  <h1 className='text-lg font-bold'>Questions {questions[currentQuestionIndex]?.id}:</h1>
                  <p className=''>
                    {questions[currentQuestionIndex]?.question}
                  </p>
                  <div className='my-4' key={currentQuestionIndex}>
                    {questions[currentQuestionIndex]?.choices?.map((choice, index) => (
                      <Choice key={index} value={index} name='radio-choice' choice={choice} onchange={handleChange} />
                    ))}
                  </div>
                  <div className='flex justify-end my-4'>
                    <button className='btn btn-sm btn-accent text-white' onClick={handleNext}>
                      {currentQuestionIndex == questions.length - 1 ? (
                        <>Finish</>
                      ) : (
                        <>Next</>
                      )}
                    </button>
                  </div>
                </div>
              )
            )}
          </main>
        </div>
      </div >
    </>
  )
}
