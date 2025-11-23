import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { 
  fetchConclusionsByClass, 
  selectConclusions, 
  selectConclusionsLoading, 
  selectConclusionsError 
} from "../../../redux/Conclu/concluSlice";
import "./ConclusionsList.css";

function ConclusionsList({ child }) {
  const dispatch = useDispatch();
  const { childId } = useParams();
  const [expandedConclusion, setExpandedConclusion] = useState(null);
  
  const conclusions = useSelector(selectConclusions);
  const loading = useSelector(selectConclusionsLoading);
  const error = useSelector(selectConclusionsError);
  
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
      dispatch(fetchConclusionsByClass(studentClass));
    }
  }, [dispatch, studentClass]);

  const toggleConclusion = (conclusionId) => {
    if (expandedConclusion === conclusionId) {
      setExpandedConclusion(null);
    } else {
      setExpandedConclusion(conclusionId);
    }
  };

  const downloadPdf = (conclusion, e) => {
    e.stopPropagation(); // Prevent toggling the card when downloading
    if (conclusion.pdfFile?.data) {
      const byteArray = new Uint8Array(conclusion.pdfFile.data.data);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${conclusion.Title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'رياضيات': 'math-badge',
      'علوم': 'science-badge',
      'لغة عربية': 'arabic-badge',
      'فرنسية': 'french-badge',
      'إنجليزية': 'english-badge',
      'اجتماعيات': 'social-badge',
      'تكنولوجيا': 'tech-badge',
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
      'اجتماعيات': '🌍',
      'تكنولوجيا': '💻',
      'default': '📝'
    };
    return icons[category] || icons.default;
  };

  return (
    <div className="conclusions-container">
      <div className="conclusions-content">
        {/* Header */}
        <div className="conclusions-header">
        
          <h1 className="header-title">الاستنتاجات اليومية</h1>
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
            <p>جاري تحميل الاستنتاجات...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>خطأ في التحميل</h3>
            <p>{error}</p>
          </div>
        ) : conclusions.length === 0 ? (
          <div className="empty-container">
            <div className="empty-icon">📚</div>
            <h3>لا توجد استنتاجات</h3>
            <p>لم يتم العثور على أي استنتاجات للصف {studentClass}.</p>
          </div>
        ) : (
          /* Conclusions Grid */
          <div className="conclusions-grid">
            {conclusions.map((item) => (
              <div
                key={item._id}
                className={`conclusion-card ${expandedConclusion === item._id ? 'expanded' : ''}`}
                onClick={() => toggleConclusion(item._id)}
              >
                {/* Category Badge */}
                <div className={`category-badge ${getCategoryColor(item.category)}`}>
                  <span className="category-icon">{getCategoryIcon(item.category)}</span>
                  {item.category}
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="conclusion-title">{item.Title}</h3>
                    <div className="class-badge">
                      الصف {item.classe}
                    </div>
                  </div>
                  
                  <div className="conclusion-text">
                    {expandedConclusion === item._id ? (
                      <div className="full-content">
                        {item.conclusion.split('\n').map((paragraph, index) => (
                          <p key={index} className="conclusion-paragraph">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="conclusion-preview">
                        {item.conclusion.length > 120 
                          ? `${item.conclusion.substring(0, 120)}...` 
                          : item.conclusion
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
                        {expandedConclusion === item._id ? 'عرض أقل ↑' : 'اقرأ المزيد ↓'}
                      </div>
                      {item.pdfFile?.data && (
                        <button 
                          className="download-btn"
                          onClick={(e) => downloadPdf(item, e)}
                        >
                          📥 تحميل PDF
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {conclusions.length > 0 && (
          <div className="stats-container">
            <h3 className="stats-title">📊 إحصائيات الاستنتاجات</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{conclusions.length}</div>
                <div className="stat-label">إجمالي الاستنتاجات</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {conclusions.filter(item => item.pdfFile?.data).length}
                </div>
                <div className="stat-label">ملفات PDF مرفقة</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {[...new Set(conclusions.map(item => item.category))].length}
                </div>
                <div className="stat-label">مجالات مختلفة</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConclusionsList;