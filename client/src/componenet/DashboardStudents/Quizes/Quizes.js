// src/components/Quizes.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Quizes.css';

function Quizes() {
  const { user } = useSelector((state) => state.auth);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [completedQuizzes, setCompletedQuizzes] = useState(() => {
    return JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
  });

  const [filter, setFilter] = useState({
    category: '',
    type: '',
    difficulty: ''
  });

  const studentClassLevel =
    useSelector((state) => state.auth.user?.children?.[0]?.class) || 1;

  useEffect(() => {
    fetchQuizzes();
  }, [studentClassLevel, filter]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        classLevel: studentClassLevel,
        ...filter
      });
      const response = await axios.get(`/api/quizzes?${params}`);
      setQuizzes(response.data);
      setError('');
    } catch (err) {
      console.error('فشل في جلب الاختبارات:', err);
      setError('فشل في تحميل الاختبارات');
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setAnswers(new Array(quiz.questions.length).fill(''));
    setQuizResult(null);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    try {
      if (!user?._id) {
        alert('يرجى تسجيل الدخول لتقديم الاختبار');
        return;
      }

      const response = await axios.post(`/api/quizzes/${selectedQuiz._id}/attempt`, {
        userId: user._id,
        answers: answers
      });

      setQuizResult(response.data);

      // ✅ Save quiz as completed ONLY if score is 100% (perfect)
      if (response.data.score === 100) {
        const updatedCompleted = [...new Set([...completedQuizzes, selectedQuiz._id])];
        setCompletedQuizzes(updatedCompleted);
        localStorage.setItem('completedQuizzes', JSON.stringify(updatedCompleted));
      }
    } catch (err) {
      console.error('فشل في تقديم الاختبار:', err);
      alert('فشل في تقديم الاختبار');
    }
  };

  const retryQuiz = () => {
    // Reset only the quiz taking state, keep the same quiz selected
    setAnswers(new Array(selectedQuiz.questions.length).fill(''));
    setQuizResult(null);
  };

  const moveToNextQuiz = () => {
    // Reset everything and go back to quiz list
    setSelectedQuiz(null);
    setAnswers([]);
    setQuizResult(null);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setAnswers([]);
    setQuizResult(null);
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // ✅ حساب نسبة التقدم (only quizzes with 100% score)
  const progressPercentage =
    quizzes.length > 0
      ? Math.round((completedQuizzes.length / quizzes.length) * 100)
      : 0;

  const renderProgressBar = () => (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <span className="progress-text">{progressPercentage}% مكتمل</span>
    </div>
  );

  const renderQuizList = () => (
    <div className="quiz-list">
      <div className="quiz-header">
        <h2>📚 الاختبارات المتاحة للصف {studentClassLevel}</h2>
        <p>اختر اختبارًا لاختبار معرفتك!</p>
      </div>

      {/* ✅ شريط التقدم */}
      {renderProgressBar()}

      <div className="quiz-filters">
        <select
          value={filter.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="filter-select"
        >
          <option value="">جميع المواد</option>
          <option value="Math">الرياضيات</option>
          <option value="French">الفرنسية</option>
          <option value="Science">العلوم</option>
          <option value="History">التاريخ</option>
          <option value="English">الإنجليزية</option>
        </select>

        <select
          value={filter.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="filter-select"
        >
          <option value="">جميع الأنواع</option>
          <option value="multiple-choice">اختيار متعدد</option>
          <option value="calculation">حسابي</option>
        </select>

        <select
          value={filter.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          className="filter-select"
        >
          <option value="">جميع المستويات</option>
          <option value="easy">سهل</option>
          <option value="medium">متوسط</option>
          <option value="hard">صعب</option>
        </select>

        <button onClick={fetchQuizzes} className="refresh-btn">
          🔄 تحديث
        </button>
      </div>

      {loading ? (
        <div className="loading">جاري تحميل الاختبارات...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : quizzes.length === 0 ? (
        <div className="no-quizzes">
          <h3>لا توجد اختبارات متاحة لمستوى صفك</h3>
        </div>
      ) : (
        <div className="quizzes-grid">
          {quizzes.map((quiz) => {
            const isDone = completedQuizzes.includes(quiz._id);
            return (
              <div
                key={quiz._id}
                className={`quiz-card ${isDone ? 'completed' : ''}`}
              >
                <div className="quiz-card-header">
                  <h3>{quiz.title}</h3>
                  <span className={`difficulty-badge ${quiz.difficulty}`}>
                    {quiz.difficulty === 'easy'
                      ? 'سهل'
                      : quiz.difficulty === 'medium'
                      ? 'متوسط'
                      : 'صعب'}
                  </span>
                </div>

                <div className="quiz-card-info">
                  <p><strong>المادة:</strong> {quiz.category}</p>
                  <p><strong>عدد الأسئلة:</strong> {quiz.questions.length}</p>
                  {isDone && <p className="completed-label">✅ مكتمل</p>}
                </div>

                <button
                  onClick={() => startQuiz(quiz)}
                  className="start-quiz-btn"
                >
                  {isDone ? 'معاينة ✅' : 'بدء الاختبار'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderQuizTaking = () => (
    <div className="quiz-taking">
      <div className="quiz-taking-header">
        <h2>{selectedQuiz.title}</h2>
        <div className="quiz-meta">
          <span>المادة: {selectedQuiz.category}</span>
          <span>
            المستوى:{' '}
            {selectedQuiz.difficulty === 'easy'
              ? 'سهل'
              : selectedQuiz.difficulty === 'medium'
              ? 'متوسط'
              : 'صعب'}
          </span>
        </div>
      </div>

      <div className="questions-container">
        {selectedQuiz.questions.map((question, index) => (
          <div key={index} className="question-card">
            <h4>السؤال {index + 1}</h4>
            <p className="question-text">{question.question}</p>
            {selectedQuiz.type === 'multiple-choice' ? (
              <div className="options-container">
                {question.options.map((option, i) => (
                  <label key={i} className="option-label">
                    <input
                      type="radio"
                      name={`q-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={answers[index]}
                onChange={(e) =>
                  handleAnswerChange(index, e.target.value)
                }
                className="answer-input"
                placeholder="أدخل إجابتك"
              />
            )}
          </div>
        ))}
      </div>

      <div className="quiz-actions">
        <button
          onClick={submitQuiz}
          disabled={answers.some((a) => !a)}
          className="submit-btn"
        >
          تقديم الإجابات
        </button>
        <button onClick={resetQuiz} className="cancel-btn">
          إلغاء
        </button>
      </div>
    </div>
  );

  const renderQuizResult = () => {
    const isPerfectScore = quizResult.score === 100;
    const isCompleted = completedQuizzes.includes(selectedQuiz._id);

    return (
      <div className="quiz-result">
        <div
          className={`result-header ${
            isPerfectScore ? 'perfect-score' : 'need-improvement'
          }`}
        >
          <h2>نتائج الاختبار</h2>
          <div className="score-circle">
            <span className="score-percentage">
              {Math.round(quizResult.score)}%
            </span>
          </div>
        </div>

        <div className="result-details">
          <p><strong>الرسالة:</strong> {quizResult.message}</p>
          <p><strong>أفضل نتيجة:</strong> {quizResult.bestScore}%</p>
          {isPerfectScore && !isCompleted && (
            <p className="success-message">🎉 مبروك! لقد أكملت هذا الاختبار بنجاح</p>
          )}
        </div>

        <div className="result-actions">
          {!isPerfectScore ? (
            <>
              <button onClick={retryQuiz} className="retry-btn">
                🔄 إعادة الاختبار
              </button>
              <button onClick={moveToNextQuiz} className="next-quiz-btn">
                ➡️ الانتقال إلى اختبار آخر
              </button>
            </>
          ) : (
            <button onClick={moveToNextQuiz} className="try-again-btn">
              اختبار آخر
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="quizes-container">
      {quizResult
        ? renderQuizResult()
        : selectedQuiz
        ? renderQuizTaking()
        : renderQuizList()}
    </div>
  );
}

export default Quizes;