import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { questions, subjects } from '../data/questions';
import './TestPage.css';

function TestPage() {
  const { examType, subject } = useParams();
  const navigate = useNavigate();
  const examName = examType === 'oge' ? 'ОГЭ' : 'ЕГЭ';

  const questionKey = `${subject}_${examType}`;
  const testQuestions = questions[questionKey] || [];
  const subjectInfo = subjects.find(s => s.id === subject);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setAnswers({});
    setCurrentIndex(0);
    setSelectedAnswer(null);
  }, [examType, subject]);

  const currentQuestion = testQuestions[currentIndex];
  const totalQuestions = testQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: index
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      const nextQ = testQuestions[nextIdx];
      setSelectedAnswer(answers[nextQ.id] ?? null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const prevQ = testQuestions[prevIdx];
      setSelectedAnswer(answers[prevQ.id] ?? null);
    }
  };

  const handleFinish = () => {
    const results = testQuestions.map(q => ({
      questionId: q.id,
      selectedAnswer: answers[q.id],
      correctAnswer: q.correctAnswer,
      isCorrect: answers[q.id] === q.correctAnswer
    }));

    const score = results.filter(r => r.isCorrect).length;
    const total = totalQuestions;

    localStorage.setItem('testResults', JSON.stringify({
      examType,
      subject,
      date: new Date().toISOString(),
      score,
      total,
      results
    }));

    navigate(`/results/${examType}/${subject}`);
  };

  const isAnswered = (index) => {
    const q = testQuestions[index];
    return answers[q.id] !== undefined;
  };

  const letters = ['А', 'Б', 'В', 'Г', 'Д'];

  if (testQuestions.length === 0) {
    return (
      <div className="test-page">
        <div className="test-error">
          <h2>Задания не найдены</h2>
          <p>К сожалению, для этого предмета пока нет демо-заданий.</p>
          <Link to={`/subjects/${examType}`} className="btn btn-primary">
            Вернуться к выбору предмета
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="test-page">
      <header className="test-header">
        <div className="test-header-left">
          <Link to={`/subjects/${examType}`} className="back-link">
            ← Назад
          </Link>
          <div className="test-info">
            <span className="exam-badge">{examName}</span>
            <span className="subject-name">{subjectInfo?.name}</span>
          </div>
        </div>
        <div className="test-header-right">
          <div className="question-counter">
            Вопрос {currentIndex + 1} из {totalQuestions}
          </div>
        </div>
      </header>

      <div className="test-progress-bar">
        <div
          className="test-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="test-main">
        <aside className="test-sidebar">
          <div className="question-nav">
            <h3>Вопросы</h3>
            <div className="question-nav-grid">
              {testQuestions.map((q, index) => (
                <button
                  key={q.id}
                  className={`nav-btn ${index === currentIndex ? 'active' : ''} ${
                    isAnswered(index) ? 'answered' : ''
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="nav-legend">
              <div className="legend-item">
                <span className="legend-dot current" />
                <span>Текущий</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot answered" />
                <span>Отвечено</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot unanswered" />
                <span>Без ответа</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="test-content">
          <div className="question-card">
            <div className="question-number">
              Вопрос {currentIndex + 1}
            </div>
            <div className="question-text">
              {currentQuestion.text}
            </div>

            <div className="options-list">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <span className="option-letter">{letters[index]}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="test-actions">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ← Назад
            </button>

            {currentIndex === totalQuestions - 1 ? (
              <button
                className="btn btn-primary"
                onClick={handleFinish}
                disabled={Object.keys(answers).length < totalQuestions}
              >
                Завершить тест
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={selectedAnswer === null}
              >
                Далее →
              </button>
            )}
          </div>

          <div className="answers-progress">
            Отвечено: {Object.keys(answers).length} из {totalQuestions}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TestPage;