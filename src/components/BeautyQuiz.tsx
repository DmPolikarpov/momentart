import React, { useState } from 'react';
import { ChevronRight, Sparkles, Award, RefreshCw } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

const BeautyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const { t } = useTranslations();

  const questions = [
    {
      id: 1,
      question: t('beautyQuiz.questions.lifestyle'),
      options: [
        { id: 0, text: t('beautyQuiz.answers.active'), points: { elegant: 1, bold: 3, natural: 2 } },
        { id: 1, text: t('beautyQuiz.answers.relaxed'), points: { elegant: 2, bold: 1, natural: 3 } },
        { id: 2, text: t('beautyQuiz.answers.professional'), points: { elegant: 3, bold: 2, natural: 1 } },
        { id: 3, text: t('beautyQuiz.answers.creative'), points: { elegant: 2, bold: 3, natural: 1 } }
      ]
    },
    {
      id: 2,
      question: t('beautyQuiz.questions.colors'),
      options: [
        { id: 0, text: t('beautyQuiz.answers.pastels'), points: { elegant: 3, bold: 1, natural: 2 } },
        { id: 1, text: t('beautyQuiz.answers.bold'), points: { elegant: 2, bold: 3, natural: 1 } },
        { id: 2, text: t('beautyQuiz.answers.earthy'), points: { elegant: 1, bold: 1, natural: 3 } },
        { id: 3, text: t('beautyQuiz.answers.bright'), points: { elegant: 1, bold: 3, natural: 2 } }
      ]
    },
    {
      id: 3,
      question: t('beautyQuiz.questions.maintenance'),
      options: [
        { id: 0, text: t('beautyQuiz.answers.lowMaintenance'), points: { elegant: 1, bold: 2, natural: 3 } },
        { id: 1, text: t('beautyQuiz.answers.salon'), points: { elegant: 3, bold: 2, natural: 1 } },
        { id: 2, text: t('beautyQuiz.answers.diy'), points: { elegant: 2, bold: 1, natural: 3 } },
        { id: 3, text: t('beautyQuiz.answers.experiment'), points: { elegant: 1, bold: 3, natural: 2 } }
      ]
    },
    {
      id: 4,
      question: t('beautyQuiz.questions.length'),
      options: [
        { id: 0, text: t('beautyQuiz.answers.short'), points: { elegant: 1, bold: 1, natural: 3 } },
        { id: 1, text: t('beautyQuiz.answers.medium'), points: { elegant: 3, bold: 2, natural: 2 } },
        { id: 2, text: t('beautyQuiz.answers.long'), points: { elegant: 2, bold: 3, natural: 1 } },
        { id: 3, text: t('beautyQuiz.answers.varies'), points: { elegant: 2, bold: 2, natural: 2 } }
      ]
    }
  ];

  const results = {
    elegant: {
      type: t('beautyQuiz.results.types.elegant.title'),
      description: t('beautyQuiz.results.types.elegant.description'),
      recommendations: t('beautyQuiz.results.types.elegant.recommendations', { returnObjects: true }) as string[],
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
      color: "from-rose-400 to-pink-500"
    },
    bold: {
      type: t('beautyQuiz.results.types.bold.title'),
      description: t('beautyQuiz.results.types.bold.description'),
      recommendations: t('beautyQuiz.results.types.bold.recommendations', { returnObjects: true }) as string[],
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=300&fit=crop",
      color: "from-purple-500 to-pink-600"
    },
    natural: {
      type: t('beautyQuiz.results.types.natural.title'),
      description: t('beautyQuiz.results.types.natural.description'),
      recommendations: t('beautyQuiz.results.types.natural.recommendations', { returnObjects: true }) as string[],
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
      color: "from-amber-400 to-rose-400"
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setTimeout(() => {
      const newAnswers = [...answers, answerIndex];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        calculateResult(newAnswers);
      }
    }, 600);
  };

  const calculateResult = (finalAnswers: number[]) => {
    const scores = { elegant: 0, bold: 0, natural: 0 };
    
    finalAnswers.forEach((answerIndex, questionIndex) => {
      const points = questions[questionIndex].options[answerIndex].points;
      scores.elegant += points.elegant;
      scores.bold += points.bold;
      scores.natural += points.natural;
    });

    const maxScore = Math.max(scores.elegant, scores.bold, scores.natural);
    const resultType = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) as keyof typeof scores;
    
    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const getResult = () => {
    const scores = { elegant: 0, bold: 0, natural: 0 };
    
    answers.forEach((answerIndex, questionIndex) => {
      const points = questions[questionIndex].options[answerIndex].points;
      scores.elegant += points.elegant;
      scores.bold += points.bold;
      scores.natural += points.natural;
    });

    const maxScore = Math.max(scores.elegant, scores.bold, scores.natural);
    const resultType = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) as keyof typeof scores;
    return results[resultType];
  };

  if (showResult) {
    const result = getResult();
    return (
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full px-6 py-2 mb-6">
                <Award className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600">{t('beautyQuiz.results.complete')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {t('beautyQuiz.results.perfectMatch')}
                </span>
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={result.image}
                    alt={result.type}
                    className="w-full h-80 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className={`inline-block bg-gradient-to-r ${result.color} text-white px-6 py-2 rounded-full font-semibold mb-6 animate-pulse`}>
                    {result.type}
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    {result.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">{t('beautyQuiz.results.recommendedFor')}</h4>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <li 
                          key={index} 
                          className="flex items-start space-x-3 animate-fade-in"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <div className={`w-6 h-6 bg-gradient-to-r ${result.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="flex items-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{t('beautyQuiz.results.takeAgain')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* ... keep existing code (background animation) */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-200/20 to-cyan-200/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full animate-float-reverse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-teal-500 animate-pulse" />
              <span className="text-sm font-medium text-teal-600">{t('beautyQuiz.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t('beautyQuiz.title')}
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              {t('beautyQuiz.description')}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    {t('beautyQuiz.progress.question')} {currentQuestion + 1} {t('beautyQuiz.progress.of')} {questions.length}
                  </span>
                  <span className="text-sm font-medium text-teal-600">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8 animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id)}
                      className={`w-full p-6 text-left bg-gray-50 rounded-2xl border-2 transition-all duration-300 hover:bg-teal-50 hover:border-teal-300 hover:scale-102 animate-fade-in ${
                        selectedAnswer === option.id 
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-teal-500 scale-105' 
                          : 'border-gray-200'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.text}</span>
                        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                          selectedAnswer === option.id ? 'text-white transform translate-x-1' : 'text-gray-400'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeautyQuiz;