import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCourses,
  selectCourses,
  selectCoursesLoading,
  selectCoursesError,
} from "../../../redux/cours/coursSlice";
import "./Cours.css";

const Cours = ({ child }) => {
  const dispatch = useDispatch();
  const { childId } = useParams();
  
  const courses = useSelector(selectCourses);
  const loading = useSelector(selectCoursesLoading);
  const error = useSelector(selectCoursesError);
  
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
    // Fetch all courses first
    dispatch(fetchCourses());
  }, [dispatch]);

  // Filter courses by current child's class
  const filteredCourses = courses.filter(course => {
    const courseClass = course.classe ? course.classe.toString() : '';
    const childClass = studentClass ? studentClass.toString() : '';
    return courseClass === childClass;
  });

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
      'default': '📚'
    };
    return icons[category] || icons.default;
  };

  return (
    <div className="cours-container">
      <div className="cours-content">
        {/* Header */}
        <div className="cours-header">
        
          <h1 className="header-title">دروس الدعم</h1>
          <div className="student-info">
            <div className="info-badge">
              <span>👤</span>
              <span>{currentChild?.name}</span>
            </div>
            <div className="info-badge">
              <span>🏫</span>
              <span>الصف {studentClass || "غير محدد"}</span>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        {!studentClass && (
          <div className="warning-message">
            ⚠️ لم يتم تحديد الصف الدراسي للطالب
          </div>
        )}

        {/* Content States */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>جاري تحميل الدروس...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>خطأ في التحميل</h3>
            <p>{error}</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="no-courses-content">
            <div className="no-courses-icon">📚</div>
            <h3>لا توجد دروس</h3>
            <p>
              {studentClass 
                ? `لا توجد دروس متاحة للصف ${studentClass} حاليًا.`
                : 'لا توجد دروس متاحة حاليًا.'
              }
            </p>
            {courses.length > 0 && (
              <div className="courses-info" style={{marginTop: '1rem'}}>
                إجمالي الدروس المتاحة: {courses.length} درس
                {studentClass && ` (مُرشّح للصف ${studentClass}: ${filteredCourses.length})`}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Courses Info */}
            {/* <div className="courses-info">
              عرض {filteredCourses.length} من أصل {courses.length} درس للصف {studentClass}
            </div> */}

            {/* Courses Grid */}
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <div key={course._id} className="course-card">
                  {/* Category Badge */}
                  <div className={`category-badge ${getCategoryColor(course.category)}`}>
                    <span className="category-icon">{getCategoryIcon(course.category)}</span>
                    {course.category}
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="course-title">{course.Title}</h3>
                      <div className="course-meta">
                        <span className="class-badge">الصف: {course.classe}</span>
                        <span className="category-tag">{course.category}</span>
                      </div>
                    </div>
                    
                    <p className="course-description">{course.description}</p>

                    {/* Video Section */}
                    {course.urlVid && (
                      <div className="video-section">
                        <div className="video-wrapper">
                          <iframe
                            className="video-frame"
                            src={
                              course.urlVid.includes("youtube")
                                ? course.urlVid.replace("watch?v=", "embed/")
                                : course.urlVid
                            }
                            title={course.Title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}

                    {/* PDF Download */}
                    {course.pdfFile && (
                      <div className="pdf-section">
                        <a
                          href={`data:${course.pdfFile.contentType};base64,${Buffer.from(
                            course.pdfFile.data
                          ).toString("base64")}`}
                          download={`${course.Title}.pdf`}
                          className="download-btn"
                        >
                          <span>📄</span>
                          <span>تحميل الملف</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="stats-container">
              <h3 className="stats-title">📊 إحصائيات الدروس</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{filteredCourses.length}</div>
                  <div className="stat-label">دروس للصف الحالي</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    {filteredCourses.filter(course => course.urlVid).length}
                  </div>
                  <div className="stat-label">دروس بالفيديو</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    {filteredCourses.filter(course => course.pdfFile).length}
                  </div>
                  <div className="stat-label">ملفات PDF مرفقة</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Debug info - remove in production */}
        {/* {process.env.NODE_ENV === 'development' && (
          <details className="debug-info">
            <summary>معلومات التصحيح (للمطورين)</summary>
            <div>
              <p><strong>الصف الحالي:</strong> {studentClass} ({typeof studentClass})</p>
              <p><strong>عدد الدروس الكلي:</strong> {courses.length}</p>
              <p><strong>عدد الدروس المفلترة:</strong> {filteredCourses.length}</p>
              <p><strong>الدروس المتاحة:</strong></p>
              <ul>
                {courses.slice(0, 5).map(course => (
                  <li key={course._id}>
                    {course.Title} - الصف: {course.classe} ({typeof course.classe})
                  </li>
                ))}
              </ul>
            </div>
          </details>
        )} */}
      </div>
    </div>
  );
};

export default Cours;