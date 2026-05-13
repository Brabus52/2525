import { Link } from 'react-router-dom';
import { examTypes } from '../data/questions';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="hero">
        <div className="hero-badge">Подготовка к экзаменам</div>
        <h1 className="hero-title">РешуЕГЭ</h1>
        <p className="hero-subtitle">
          Интерактивная платформа для подготовки к ОГЭ и ЕГЭ.
          Решай задачи, отслеживай прогресс, достигай результатов!
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-icon">📚</span>
            <span className="stat-value">6</span>
            <span className="stat-label">Предметов</span>
          </div>
          <div className="stat">
            <span className="stat-icon">📝</span>
            <span className="stat-value">150+</span>
            <span className="stat-label">Заданий</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">100%</span>
            <span className="stat-label">Результат</span>
          </div>
        </div>
      </header>

      <section className="exam-selection">
        <h2 className="section-title">Выберите экзамен</h2>
        <div className="exam-cards">
          {examTypes.map((exam) => (
            <Link
              key={exam.id}
              to={`/subjects/${exam.id}`}
              className="exam-card"
            >
              <div className="exam-card-icon">
                {exam.id === 'oge' ? '🎓' : '🎓'}
              </div>
              <div className="exam-card-content">
                <h3 className="exam-card-title">{exam.name}</h3>
                <p className="exam-card-fullname">{exam.fullName}</p>
                <p className="exam-card-desc">{exam.description}</p>
                <div className="exam-card-grade">
                  <span className="grade-badge">{exam.grade}</span>
                </div>
              </div>
              <div className="exam-card-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Возможности платформы</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Демо-варианты</h3>
            <p>Пробные варианты экзаменов с заданиями разной сложности</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Подробные решения</h3>
            <p>К каждому заданию прилагается объяснение правильного ответа</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Отслеживание прогресса</h3>
            <p>Анализируйте свои результаты и улучшайте показатели</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Мгновенная проверка</h3>
            <p>Узнавайте результат сразу после выполнения теста</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;