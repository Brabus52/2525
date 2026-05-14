import { Link, useParams } from 'react-router-dom';
import { subjects, questions } from '../data/questions';
import './Subjects.css';

function Subjects() {
  const { examType } = useParams();
  const examName = examType === 'oge' ? 'ОГЭ' : 'ЕГЭ';

  const getQuestionCount = (subjectId) => {
    const key = `${subjectId}_${examType}`;
    return questions[key]?.length || 0;
  };

  return (
    <div className="subjects-page">
      <header className="subjects-header">
        <Link to="/" className="back-link">
          <span>←</span> На главную
        </Link>
        <h1 className="page-title">
          <span className="exam-badge">{examName}</span>
          Выберите предмет
        </h1>
      </header>

      <main className="subjects-main">
        <div className="subjects-grid">
          {subjects.map((subject) => {
            const questionCount = getQuestionCount(subject.id);
            return (
              <Link
                key={subject.id}
                to={`/test/${examType}/${subject.id}`}
                className="subject-card"
              >
                <div className="subject-icon">{subject.icon}</div>
                <div className="subject-info">
                  <h2 className="subject-name">{subject.name}</h2>
                  <p className="subject-description">{subject.description}</p>
                  <div className="subject-meta">
                    <span className="question-count">
                      📝 {questionCount} заданий
                    </span>
                  </div>
                </div>
                <div className="subject-arrow">→</div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Subjects;