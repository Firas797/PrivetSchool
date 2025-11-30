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
    try {
      return JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState({ category: '', type: '', difficulty: '' });

  const studentClassLevel = useSelector(
    (state) => state.auth.user?.children?.[0]?.class || 1
  );

  useEffect(() => {
    fetchQuizzes();
  }, [studentClassLevel, filter]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        classLevel: studentClassLevel,
        ...filter,
      });
      const response = await axios.get(`/api/quizzes?${params}`);
      setQuizzes(Array.isArray(response.data) ? response.data : []);
      setError('');
    } catch (err) {
      console.error('Failed to fetch quizzes:', err);
      setError('فشل في تحميل الاختبارات');
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = (quiz) => {
    if (!quiz?.questions) return; // safety check
    setSelectedQuiz(quiz);
    setAnswers(new Array(quiz.questions.length).fill(''));
    setQuizResult(null);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[questionIndex] = answer;
      return copy;
    });
  };

  const submitQuiz = async () => {
    if (!selectedQuiz || !user?._id) return;
    try {
      const response = await axios.post(`/api/quizzes/${selectedQuiz._id}/attempt`, {
        userId: user._id,
        answers: answers,
      });
      const result = response?.data || {};
      setQuizResult(result);

      if (result.score === 100) {
        const updated = [...new Set([...completedQuizzes, selectedQuiz._id])];
        setCompletedQuizzes(updated);
        localStorage.setItem('completedQuizzes', JSON.stringify(updated));
      }
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      alert('فشل في تقديم الاختبار');
    }
  };

  const retryQuiz = () => {
    if (!selectedQuiz?.questions) return;
    setAnswers(new Array(selectedQuiz.questions.length).fill(''));
    setQuizResult(null);
  };

  const moveToNextQuiz = () => {
    setSelectedQuiz(null);
    setAnswers([]);
    setQuizResult(null);
  };

  const resetQuiz = () => {
    moveToNextQuiz();
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const progressPercentage =
    quizzes.length > 0
      ? Math.round((completedQuizzes.length / quizzes.length) * 100)
      : 0;

  const renderProgressBar = () => (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
      <span className="progress-text">{progressPercentage}% مكتمل</span>
    </div>
  );

  const renderQuizList = () => (
    <div className="quiz-list">
      <div className="quiz-header">
        <h2 className='text-white'>📚 الاختبارات المتاحة للصف {studentClassLevel}</h2>
        <p className='text-white'>اختر اختبارًا لاختبار معرفتك!</p>
      </div>

      {renderProgressBar()}

      <div className="quiz-filters">
        <select
          value={filter.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
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
        >
          <option value="">جميع الأنواع</option>
          <option value="multiple-choice">اختيار متعدد</option>
          <option value="calculation">حسابي</option>
        </select>

        <select
          value={filter.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
        >
          <option value="">جميع المستويات</option>
          <option value="easy">سهل</option>
          <option value="medium">متوسط</option>
          <option value="hard">صعب</option>
        </select>

        <button onClick={fetchQuizzes}>🔄 تحديث</button>
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
            if (!quiz?._id) return null; // safety
            const isDone = completedQuizzes.includes(quiz._id);
            return (
              <div key={quiz._id} className={`quiz-card ${isDone ? 'completed' : ''}`}>
                <div className="quiz-card-header">
                  <h3>{quiz.title || 'بدون عنوان'}</h3>
                  <span className={`difficulty-badge ${quiz.difficulty || 'easy'}`}>
                    {quiz.difficulty === 'easy'
                      ? 'سهل'
                      : quiz.difficulty === 'medium'
                      ? 'متوسط'
                      : 'صعب'}
                  </span>
                </div>

                <div className="quiz-card-info">
                  <p><strong>المادة:</strong> {quiz.category || '---'}</p>
                  <p><strong>عدد الأسئلة:</strong> {quiz.questions?.length || 0}</p>
                  {isDone && <p className="completed-label">✅ مكتمل</p>}
                </div>

                <button onClick={() => startQuiz(quiz)}>
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
      <h2>{selectedQuiz?.title || 'اختبار'}</h2>
      {(selectedQuiz?.questions || []).map((q, i) => (
        <div key={i}>
          <p>{q?.question || 'سؤال فارغ'}</p>
          {selectedQuiz.type === 'multiple-choice' ? (
            (q.options || []).map((opt, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name={`q-${i}`}
                  value={opt}
                  checked={answers[i] === opt}
                  onChange={() => handleAnswerChange(i, opt)}
                />
                {opt}
              </label>
            ))
          ) : (
            <input
              type="text"
              value={answers[i] || ''}
              onChange={(e) => handleAnswerChange(i, e.target.value)}
              placeholder="أدخل إجابتك"
            />
          )}
        </div>
      ))}

      <button onClick={submitQuiz} disabled={(answers || []).some((a) => !a)}>
        تقديم الإجابات
      </button>
      <button onClick={resetQuiz}>إلغاء</button>
    </div>
  );

  const renderQuizResult = () => {
    if (!quizResult || !selectedQuiz) return null;
    const isPerfect = quizResult?.score === 100;
    const isCompleted = completedQuizzes.includes(selectedQuiz._id);

    return (
      <div className="quiz-result">
        <h2>نتائج الاختبار</h2>
        <p>نسبة النجاح: {Math.round(quizResult.score || 0)}%</p>
        {isPerfect && !isCompleted && <p>🎉 أكملت الاختبار بنجاح!</p>}
        <button onClick={moveToNextQuiz}>اختبار آخر</button>
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
