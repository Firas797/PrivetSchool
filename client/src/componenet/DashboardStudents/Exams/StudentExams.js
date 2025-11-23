// src/components/StudentExams/StudentExams.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getExamsByClass,
  getAllExams,
  selectExams,
  selectExamsLoading,
  selectExamsError,
} from '../../../redux/Exam/examSlice';
import './StudentExams.css';

const classMap = {
  '1': '1ère année',
  '1A': '1ère année',
  '1a': '1ère année',
  '1ere': '1ère année',
  '1ère': '1ère année',
  '1ère année': '1ère année',
  'first': '1ère année',
  'السنة الأولى': '1ère année',

  '2': '2ème année',
  '2A': '2ème année',
  '2ème': '2ème année',
  'second': '2ème année',
  'السنة الثانية': '2ème année',

  // add others as needed
  '3': '3ème année',
  '4': '4ème année',
  '5': '5ème année',
  '6': '6ème année',
};

const normalizeClass = (raw) => {
  if (!raw) return '';
  const key = String(raw).trim();
  // try direct map
  if (classMap[key]) return classMap[key];
  // try lowercase simplified
  const simplified = key.toLowerCase().replace(/\s+/g, '').replace(/é|è|ê/g, 'e').replace(/è|ê/g, 'e');
  // search keys ignoring accents and spaces
  for (const k of Object.keys(classMap)) {
    const simplifiedKey = k.toLowerCase().replace(/\s+/g, '').replace(/é|è|ê/g, 'e');
    if (simplified === simplifiedKey) return classMap[k];
  }
  // fallback: return original raw (may or may not match DB)
  return raw;
};

function StudentExams({ child }) {
  const dispatch = useDispatch();
  const exams = useSelector(selectExams);
  const loading = useSelector(selectExamsLoading);
  const error = useSelector(selectExamsError);

  const user = useSelector((state) => state.auth?.user);
  const children = user?.children || [];

  // if parent provided child prop, use it. else try first child or children[0]
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const getCurrentChild = () => {
    if (child) return child;
    // If there's only one child, pick it
    return children?.[0] ?? null;
  };

  const currentChild = getCurrentChild();
  const rawClass = currentChild?.class ?? currentChild?.classe ?? currentChild?.grade;
  const studentClass = useMemo(() => normalizeClass(rawClass), [rawClass]);

  useEffect(() => {
    // If studentClass is available, fetch by class, otherwise fetch all
    if (studentClass) {
      dispatch(getExamsByClass(studentClass));
    } else {
      dispatch(getAllExams());
    }
  }, [dispatch, studentClass]);

  const filteredExams = exams.filter((exam) => {
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !search ||
      (exam.Title && exam.Title.toLowerCase().includes(search)) ||
      (exam.description && exam.description.toLowerCase().includes(search));
    const matchesCategory = filterCategory === 'all' || (exam.category === filterCategory);
    return matchesSearch && matchesCategory;
  });

  const downloadFile = (exam) => {
    if (!exam.file || !exam.file.data) return;
    const byteArray = new Uint8Array(exam.file.data.data);
    const blob = new Blob([byteArray], { type: exam.file.contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const ext = exam.file.contentType.includes('pdf') ? 'pdf' : 'jpg';
    link.download = `${exam.Title}_${exam.classe}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // categories from current fetched exams
  const categories = ['all', ...Array.from(new Set(exams.map((e) => e.category).filter(Boolean)))];

  return (
    <div className="student-exams-container">
      <div className="student-exams-content">
        <header>
          <h1>الامتحانات المدرسية</h1>
          <div className="student-info">
            <div>{currentChild?.name ?? '—'}</div>
            <div>{studentClass ?? 'غير مُسندة'}</div>
          </div>
        </header>

        <div className="filters">
          <input placeholder="ابحث..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map((c) => <option key={c} value={c}>{c === 'all' ? 'الكل' : c}</option>)}
          </select>
        </div>

        {loading ? (
          <div>جاري التحميل...</div>
        ) : error ? (
          <div>خطأ: {JSON.stringify(error)}</div>
        ) : filteredExams.length === 0 ? (
          <div>
            <h3>لا يوجد امتحانات</h3>
            <p>
              {exams.length === 0
                ? `لا يوجد أي امتحان متاح للقسم ${studentClass || '—'} حاليا.`
                : 'لا يوجد نتيجة تطابق الفلاتر.'}
            </p>
          </div>
        ) : (
          <div className="exams-grid">
            {filteredExams.map((exam) => (
              <div key={exam._id} className="exam-card">
                <div className="exam-head">
                  <h3>{exam.Title}</h3>
                  <div>{exam.category} • {exam.classe}</div>
                </div>
                <div className="exam-body">
                  <p>{exam.description}</p>
                </div>
                <div className="exam-actions">
                  {exam.file ? (
                    <button onClick={() => downloadFile(exam)}>تحميل</button>
                  ) : (
                    <span>بدون ملف</span>
                  )}
                  <small>{new Date(exam.createdAt).toLocaleDateString('ar-TN')}</small>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentExams;
