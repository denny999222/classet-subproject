// SETUP
import { useState } from "react";
import axios from "axios";

// TYPES
import { Question_Type, Career_Type } from "@/models/types_db";

import { useAuth } from "@/contexts/AuthContext";

// COMPONENTS
import Steps from "@/components/TradeSkillQuiz/Steps";
import ProgressBar from "@/components/TradeSkillQuiz/ProgressBar";
import QuestionSection from "@/components/TradeSkillQuiz/QuestionSection";
import HeaderSection from "@/components/TradeSkillQuiz/HeaderSection";
import QuizResults from "@/components/TradeSkillQuiz/QuizResults";

import { getApiUrl } from "@/functions/helper";

interface HomeProps {
  questions: Question_Type[];
  careers: Career_Type[];
}

export default function Home({ questions, careers }: HomeProps) {
  const { session } = useAuth();
  const [allQuestions, setAllQuestions] = useState<Question_Type[]>(questions);
  const [totalAnswered, setTotalAnswered] = useState({});
  const [page, setPage] = useState<number>(2);

  const [topCareers, setTopCareers] = useState([]);
  const [finishedQuiz, setFinishedQuiz] = useState(false);

  const onNext = async () => {
    const data = (
      await axios.get(
        `https://classet-subproject-g8i3.vercel.app/api/questions?page=${page}&size=5`
      )
    ).data;
    setAllQuestions([...allQuestions, ...data.questions]);
    if (data.questions.length != 0) setPage(page + 1);
  };

  const onAnswer = async (value: number, question_id: number) => {
    axios
      .post(`https://classet-subproject-g8i3.vercel.app/api/user_answers`, {
        question_id,
        answer: value,
      })
      .then((res) => {
        setTotalAnswered({ ...totalAnswered, [question_id]: value });
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  };

  const onGetResults = async () => {
    axios
      .get(`https://classet-subproject-g8i3.vercel.app/api/quiz_results`)
      .then((res) => {
        setFinishedQuiz(true);
        setTopCareers(res.data.top_careers);
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  };

  return (
    <div className="w-full text-center">
      <HeaderSection />
      <Steps />

      {/* <button onClick={onGetResults}>on finish quiz</button> */}

      {session ? (
        finishedQuiz ? (
          <QuizResults careers={topCareers} />
        ) : (
          <>
            <ProgressBar percentage={(page - 2) * 10} />
            {allQuestions
              .slice(allQuestions.length - 5, allQuestions.length)
              .map((question, i) => {
                return (
                  <QuestionSection
                    key={question.id}
                    id={question.id}
                    text={question.text}
                    onChange={(value) => {
                      onAnswer(value, question.id);
                    }}
                  />
                );
              })}
            <button
              disabled={
                Object.keys(totalAnswered).length != allQuestions.length
              }
              onClick={() =>
                Object.keys(totalAnswered).length == 50
                  ? onGetResults()
                  : onNext()
              }
              className="group relative inline-block focus:outline-none focus:ring cursor-pointer mb-72 mt-20"
            >
              <span className="px-14 py-4 relative inline-block bg-white border-2 border-warning border-current px-4 py-2 text-xl font-bold uppercase tracking-widest text-warning group-active:text-opacity-75">
                {page == 11 ? "Finish" : "Next"}
              </span>
            </button>
          </>
        )
      ) : (
        <p className="font-mono text-lg sm:text-2xl font-bold text-gray-500 mb-8 mx-4 mt-16 mb-32">
          Please login to begin the Quiz...
        </p>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const data_questions = (
    await axios.get(
      `https://classet-subproject-g8i3.vercel.app/api/questions?page=1&size=5`
    )
  ).data;

  return {
    props: {
      questions: data_questions.questions,
      careers: [],
    },
  };
}
