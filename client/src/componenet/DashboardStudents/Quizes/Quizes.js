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
      const stored = localStorage.getItem('completedQuizzes');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error parsing completedQuizzes:', error);
      return [];
    }
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
      setError('');
      
      const API_BASE_URL = process.env.REACT_APP_API_URL || "https://privetschool-backend.ohbjmh.easypanel.host";
      
      const params = new URLSearchParams({
        classLevel: studentClassLevel,
        ...filter
      });
      
      console.log('Fetching quizzes from:', `${API_BASE_URL}/api/quizzes?${params}`);
      
      // Get token from localStorage if available
      const token = localStorage.getItem('token');
      const config = token ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } : {};
      
      const response = await axios.get(`${API_BASE_URL}/api/quizzes?${params}`, config);
      
      console.log('API Response:', response.data);
      
      // Handle different response formats
      let quizzesData = [];
      
      if (Array.isArray(response.data)) {
        // Case 1: Response is already an array
        quizzesData = response.data;
      } else if (response.data && Array.isArray(response.data.quizzes)) {
        // Case 2: Response has a quizzes property
        quizzesData = response.data.quizzes;
      } else if (response.data && Array.isArray(response.data.data)) {
        // Case 3: Response has a data property
        quizzesData = response.data.data;
      } else {
        // Case 4: Response is not in expected format
        console.warn('Unexpected API response format:', response.data);
        quizzesData = [];
      }
      
      setQuizzes(quizzesData);
      
      if (quizzesData.length === 0) {
        setError('لا توجد اختبارات متاحة لمستوى صفك');
      }
      
    } catch (err) {
      console.error('فشل في جلب الاختبارات:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      
      // Better error messages
      if (err.response?.status === 401) {
        setError('يرجى تسجيل الدخول للوصول للاختبارات');
      } else if (err.response?.status === 404) {
        setError('لا توجد اختبارات متاحة');
      } else if (err.message === 'Network Error') {
        setError('خطأ في الاتصال بالخادم');
      } else {
        setError('فشل في تحميل الاختبارات');
      }
      
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = (quiz) => {
    if (!quiz || !quiz.questions || !Array.isArray(quiz.questions)) {
      console.error('Invalid quiz data:', quiz);
      alert('بيانات الاختبار غير صالحة');
      return;
    }
    
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
      
      if (!selectedQuiz?._id) {
        alert('الاختبار غير صالح');
        return;
      }

      const API_BASE_URL = process.env.REACT_APP_API_URL || "https://privetschool-backend.ohbjmh.easypanel.host";
      
      const token = localStorage.getItem('token');
      const config = token ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } : {};

      const response = await axios.post(
        `${API_BASE_URL}/api/quizzes/${selectedQuiz._id}/attempt`,
        {
          userId: user._id,
          answers: answers
        },
        config
      );

      setQuizResult(response.data);

      // ✅ Save quiz as completed
      const updatedCompleted = [...new Set([...completedQuizzes, selectedQuiz._id])];
      setCompletedQuizzes(updatedCompleted);
      localStorage.setItem('completedQuizzes', JSON.stringify(updatedCompleted));
    } catch (err) {
      console.error('فشل في تقديم الاختبار:', err);
      alert('فشل في تقديم الاختبار');
    }
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

  // ✅ حساب نسبة التقدم
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
        <h2 className='text-white'>📚 الاختبارات المتاحة للصف {studentClassLevel}</h2>
        <p className='text-white'>اختر اختبارًا لاختبار معرفتك!</p>
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
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchQuizzes} className="retry-btn">
            🔄 إعادة المحاولة
          </button>
        </div>
      ) : !Array.isArray(quizzes) ? (
        <div className="error-message">
          <p>خطأ في تنسيق البيانات</p>
          <button onClick={fetchQuizzes} className="retry-btn">
            🔄 إعادة المحاولة
          </button>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="no-quizzes">
          <h3>لا توجد اختبارات متاحة لمستوى صفك</h3>
        </div>
      ) : (
        <div className="quizzes-grid">
          {quizzes.map((quiz) => {
            if (!quiz || !quiz._id) return null; // Safety check
            
            const isDone = completedQuizzes.includes(quiz._id);
            return (
              <div
                key={quiz._id}
                className={`quiz-card ${isDone ? 'completed' : ''}`}
              >
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
                  <p><strong>المادة:</strong> {quiz.category || 'غير محدد'}</p>
                  <p><strong>عدد الأسئلة:</strong> {quiz.questions?.length || 0}</p>
                  {isDone && <p className="completed-label">✅ مكتمل</p>}
                </div>

                <button
                  onClick={() => startQuiz(quiz)}
                  className="start-quiz-btn"
                  disabled={isDone}
                >
                  {isDone ? 'منجز ✅' : 'بدء الاختبار'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderQuizTaking = () => {
    if (!selectedQuiz) {
      return (
        <div className="error-message">
          <p>الاختبار غير متاح</p>
          <button onClick={resetQuiz} className="cancel-btn">
            العودة للقائمة
          </button>
        </div>
      );
    }
    
    return (
      <div className="quiz-taking">
        <div className="quiz-taking-header">
          <h2>{selectedQuiz.title || 'اختبار'}</h2>
          <div className="quiz-meta">
            <span>المادة: {selectedQuiz.category || 'غير محدد'}</span>
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
          {(selectedQuiz.questions || []).map((question, index) => (
            <div key={index} className="question-card">
              <h4>السؤال {index + 1}</h4>
              <p className="question-text">{question?.question || 'سؤال'}</p>
              {selectedQuiz.type === 'multiple-choice' ? (
                <div className="options-container">
                  {(question?.options || []).map((option, i) => (
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
                  value={answers[index] || ''}
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
  };

  const renderQuizResult = () => {
    if (!quizResult) {
      return (
        <div className="quiz-result">
          <p>لا توجد نتائج</p>
          <button onClick={resetQuiz} className="try-again-btn">
            العودة للقائمة
          </button>
        </div>
      );
    }
    
    return (
      <div className="quiz-result">
        <div
          className={`result-header ${
            quizResult.score === 100 ? 'perfect-score' : 'need-improvement'
          }`}
        >
          <h2>نتائج الاختبار</h2>
          <div className="score-circle">
            <span className="score-percentage">
              {Math.round(quizResult.score || 0)}%
            </span>
          </div>
        </div>

        <div className="result-details">
          <p><strong>الرسالة:</strong> {quizResult.message || '--'}</p>
          <p><strong>أفضل نتيجة:</strong> {quizResult.bestScore || 0}%</p>
        </div>

        <button onClick={resetQuiz} className="try-again-btn">
          اختبار آخر
        </button>
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