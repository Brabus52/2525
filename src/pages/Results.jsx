import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { questions, subjects } from '../data/questions';
import './Results.css';

function Results() {
  const { examType, subject } = useParams();
  const examName = examType === 'oge' ? 'ОГЭ' : 'ЕГЭ';
  const subjectInfo = subjects.find(s => s.id === subject);

  const [results, setResults] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const savedResults = localStorage.getItem('testResults');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);
    }
  }, []);

  if (!results) {
    return (
      <div className="results-page">
        <div className="results-loading">
          <p>Загрузка результатов...</p>
        </div>
      </div>
    );
  }

  const { score, total, results: answerResults } = results;
  const percentage = Math.round((score / total) * 100);
  const questionKey = `${subject}_${examType}`;
  const testQuestions = questions[questionKey] || [];

  const getResultEmoji = () => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '🌟';
    if (percentage >= 40) return '💪';
    return '📚';
  };

  const getResultMessage = () => {
    if (percentage >= 80) return 'Отличный результат!';
    if (percentage >= 60) return 'Хороший результат!';
    if (percentage >= 40) return 'Неплохо, но есть куда расти!';
    return 'Нужно больше практики';
  };

  return (
    <div className="results-page">
      <header className="results-header">
        <div className="results-header-content">
          <Link to={`/subjects/${examType}`} className="back-link">
            ← К выбору предмета
          </Link>
        </div>
      </header>

      <main className="results-main">
        <div className={`score-card ${showAnimation ? 'animate' : ''}`}>
          <div className="score-icon">{getResultEmoji()}</div>
          <h1 className="score-title">{getResultMessage()}</h1>
          <div className="score-display">
            <span className="score-value">{score}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{total}</span>
          </div>
          <div className="score-percentage">{percentage}% правильных ответов</div>

          <div className="score-breakdown">
            <div className="breakdown-item correct">
              <span className="breakdown-icon">✓</span>
              <span className="breakdown-count">{score}</span>
              <span className="breakdown-label">Правильно</span>
            </div>
            <div className="breakdown-item incorrect">
              <span className="breakdown-icon">✗</span>
              <span className="breakdown-count">{total - score}</span>
              <span className="breakdown-label">Неправильно</span>
            </div>
          </div>
        </div>

        <section className="answers-review">
          <h2 className="review-title">Разбор ответов</h2>

          <div className="answers-list">
            {testQuestions.map((question, index) => {
              const answer = answerResults[index];
              const isCorrect = answer?.isCorrect;
              const userAnswer = answer?.selectedAnswer;
              const letters = ['А', 'Б', 'В', 'Г', 'Д'];

              return (
                <div
                  key={question.id}
                  className={`answer-card ${isCorrect ? 'correct' : 'incorrect'}`}
                >
                  <div className="answer-header">
                    <span className="answer-number">Вопрос {index + 1}</span>
                    <span className={`answer-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? '✓ Правильно' : '✗ Неправильно'}
                    </span>
                  </div>

                  <div className="answer-question">{question.text}</div>

                  <div className="answer-details">
                    {userAnswer !== undefined ? (
                      <div className="your-answer">
                        <span className="answer-label">Ваш ответ:</span>
                        <span className={`answer-value ${isCorrect ? 'correct' : 'incorrect'}`}>
                          {letters[userAnswer]}) {question.options[userAnswer]}
                        </span>
                      </div>
                    ) : (
                      <div className="your-answer">
                        <span className="answer-label">Ваш ответ:</span>
                        <span className="answer-value no-answer">Не ответили</span>
                      </div>
                    )}

                    {!isCorrect && (
                      <div className="correct-answer">
                        <span className="answer-label">Правильный ответ:</span>
                        <span className="answer-value correct">
                          {letters[question.correctAnswer]}) {question.options[question.correctAnswer]}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="answer-explanation">
                    <span className="explanation-icon">💡</span>
                    <span className="explanation-text">{question.explanation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="results-actions">
          <Link to={`/test/${examType}/${subject}`} className="btn btn-primary">
            Пройти ещё раз
          </Link>
          <Link to="/" className="btn btn-secondary">
            На главную
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Results;