import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { 
  fetchHomeWorksByClass, 
  selectHomeWorks, 
  selectHomeWorksLoading, 
  selectHomeWorksError 
} from "../../../redux/HomeWork/HwSlice";
import "./HomeWorks.css";

function HomeWorks({ child }) {
  const dispatch = useDispatch();
  const { childId } = useParams();
  const [expandedHomework, setExpandedHomework] = useState(null);

  const homeworks = useSelector(selectHomeWorks);
  const loading = useSelector(selectHomeWorksLoading);
  const error = useSelector(selectHomeWorksError);

  const user = useSelector((state) => state.auth.user);
  const children = user?.children || [];
  
  // Get current child data
  const getCurrentChild = () => {
    if (child) return child;
    if (childId && children.length > 0) {
      const currentChild = children.find(c => c._id === childId);
      if (currentChild) return currentChild;
    }
    return children[0] || null;
  };

  const currentChild = getCurrentChild();
  const studentClass = currentChild?.class;

  useEffect(() => {
    if (studentClass) {
      dispatch(fetchHomeWorksByClass(studentClass));
    }
  }, [dispatch, studentClass]);

  const toggleHomework = (homeworkId) => {
    if (expandedHomework === homeworkId) {
      setExpandedHomework(null);
    } else {
      setExpandedHomework(homeworkId);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'رياضيات': 'math-badge',
      'علوم': 'science-badge',
      'لغة عربية': 'arabic-badge',
      'فرنسية': 'french-badge',
      'إنجليزية': 'english-badge',
      'تاريخ': 'history-badge',
      'جغرافيا': 'geography-badge',
      'default': 'default-badge'
    };
    return colors[category] || colors.default;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'رياضيات': '🧮',
      'علوم': '🔬',
      'لغة عربية': '📖',
      'فرنسية': '🥖',
      'إنجليزية': '🔤',
      'تاريخ': '📜',
      'جغرافيا': '🌍',
      'default': '📝'
    };
    return icons[category] || icons.default;
  };

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  return (
    <div className="homeworks-container">
      <div className="homeworks-content">
        {/* Header */}
        <div className="homeworks-header">
     
          <h1 className="header-title">الواجبات المنزلية</h1>
          <div className="student-info">
            <div className="info-badge">
              <span>👤</span>
              <span>{currentChild?.name}</span>
            </div>
            <div className="info-badge">
              <span>🏫</span>
              <span>الصف {studentClass || "غير معروف"}</span>
            </div>
          </div>
        </div>

        {/* Content States */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>جاري تحميل الواجبات...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>خطأ في التحميل</h3>
            <p>{error}</p>
          </div>
        ) : homeworks.length === 0 ? (
          <div className="empty-container">
            <div className="empty-icon">📚</div>
            <h3>لا توجد واجبات</h3>
            <p>لم يتم العثور على أي واجبات منزلية للصف {studentClass}.</p>
          </div>
        ) : (
          /* Homeworks Grid */
          <div className="homeworks-grid">
            {homeworks.map((item) => (
              <div
                key={item._id}
                className={`homework-card ${expandedHomework === item._id ? 'expanded' : ''}`}
                onClick={() => toggleHomework(item._id)}
              >
                {/* Category Badge */}
                <div className={`category-badge ${getCategoryColor(item.category)}`}>
                  <span className="category-icon">{getCategoryIcon(item.category)}</span>
                  {item.title}
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="homework-title">{item.category}</h3>
                    <div className="class-badge">
                      الصف {item.classe}
                    </div>
                  </div>
                  
                  <div className="homework-description">
                    {expandedHomework === item._id ? (
                      <div className="full-content">
                        {item.description.split('\n').map((paragraph, index) => (
                          <p key={index} className="description-paragraph">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="description-preview">
                        {item.description.length > 120 
                          ? `${item.description.substring(0, 120)}...` 
                          : item.description
                        }
                      </p>
                    )}
                  </div>

                  <div className="card-footer">
                    <div className="date-badge">
                      {new Date(item.createdAt).toLocaleDateString('ar-EG', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="card-actions">
                      <div className="read-more">
                        {expandedHomework === item._id ? 'عرض أقل ↑' : 'اقرأ المزيد ↓'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF Download Section */}
                {item.pdfFile && (
                  <div className="pdf-indicator">
                    <span>📄</span>
                    <span>ملف PDF مرفق</span>
                    <a
                      href={`https://57.131.24.227/${item.pdfFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>📥</span>
                      <span>تحميل PDF</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {homeworks.length > 0 && (
          <div className="stats-container">
            <h3 className="stats-title">📊 إحصائيات الواجبات</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{homeworks.length}</div>
                <div className="stat-label">إجمالي الواجبات</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {homeworks.filter(item => item.pdfFile).length}
                </div>
                <div className="stat-label">ملفات PDF مرفقة</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {[...new Set(homeworks.map(item => item.category))].length}
                </div>
                <div className="stat-label">مواد مختلفة</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeWorks;