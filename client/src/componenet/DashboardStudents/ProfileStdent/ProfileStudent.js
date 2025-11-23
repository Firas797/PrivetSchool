import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBListGroup,
    MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { updateProfilePicture, refreshUserData } from '../../../redux/LoginRegister/authSlice';

function ProfileStudent() {
    const dispatch = useDispatch();
    const { childId } = useParams();
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const { user } = useSelector(state => state.auth);
    const children = user?.children || [];

    const getCurrentChild = () => {
        if (childId && children.length > 0) {
            const child = children.find(c => c._id === childId);
            if (child) return child;
        }
        return children[0] || null;
    };

    const student = getCurrentChild();
    const parentData = user;

    const fallbackStudent = {
        name: "طالب",
        age: 11,
        class: 9,
        _id: "default",
        role: "user"
    };

    const displayStudent = student || fallbackStudent;

    const getProfilePicture = () => {
        if (displayStudent.profilePicture) {
            return `http://localhost:5000/${displayStudent.profilePicture}`;
        }
        if (user?.profilePicture) {
            return `http://localhost:5000/${user.profilePicture}`;
        }
        return "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('يرجى اختيار ملف صورة (JPEG, PNG, إلخ)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('يجب أن يكون حجم الملف أقل من 5MB');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            await dispatch(updateProfilePicture({ formData, childId: displayStudent._id })).unwrap();
            toast.success('تم تحديث الصورة الشخصية بنجاح!');
            dispatch(refreshUserData());
        } catch (error) {
            console.error(error);
            toast.error(error.payload?.msg || 'فشل في رفع الصورة الشخصية');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    if (children.length === 0) {
        return (
            <section style={{ backgroundColor: '#eee' }}>
                <MDBContainer className="py-5">
                    <MDBRow className="justify-content-center">
                        <MDBCol lg="8">
                            <MDBCard className="text-center">
                                <MDBCardBody className="py-5">
                                    <i className="fas fa-user-slash text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                                    <h4 className="text-muted">لا يوجد أطفال مسجلين</h4>
                                    <p className="text-muted">يرجى الاتصال بالإدارة لإضافة أطفال إلى حسابك</p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        );
    }

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <MDBContainer className="py-5">
                <MDBRow className="justify-content-center">
                    <MDBCol lg="12">
                        <div className="text-center mb-4">
                            <h1 className="fw-bold">هذا موقعك الخاص</h1>
                            <p className="text-muted">مرحباً بك في صفحتك الشخصية</p>
                            {children.length > 1 && (
                                <div className="badge bg-primary mb-2">
                                    {children.length} طالب
                                </div>
                            )}
                        </div>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    {/* Sidebar: stays on top on mobile */}
                    <MDBCol lg="4" className="order-1 mb-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <div className="position-relative d-inline-block">
                                    <MDBCardImage
                                        src={getProfilePicture()}
                                        alt="الصورة الشخصية"
                                        className="rounded-circle"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            opacity: uploading ? 0.7 : 1
                                        }}
                                        fluid
                                    />
                                    {uploading && (
                                        <div className="position-absolute top-50 start-50 translate-middle">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">جاري التحديث...</span>
                                            </div>
                                        </div>
                                    )}
                                    <MDBBtn
                                        color='primary'
                                        size='sm'
                                        className="rounded-circle position-absolute"
                                        style={{
                                            bottom: '10px',
                                            right: '10px',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onClick={triggerFileInput}
                                        disabled={uploading}
                                    >
                                        <i className="fas fa-camera"></i>
                                    </MDBBtn>
                                </div>
                                <br />
                                <br />
                                <h4>{displayStudent.name}</h4>
                                <p className="text-muted mb-4">{parentData?.address}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn onClick={triggerFileInput} disabled={uploading}>
                                        {uploading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                جاري التحديث...
                                            </>
                                        ) : (
                                            'تغيير الصورة الشخصية'
                                        )}
                                    </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup flush className="rounded-3">
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <i className="fas fa-user-graduate text-primary"></i>
                                        <MDBCardText>طالب</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <i className="fas fa-book text-success"></i>
                                        <MDBCardText>الصف {displayStudent.class}</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <i className="fas fa-birthday-cake text-warning"></i>
                                        <MDBCardText>{displayStudent.age} سنة</MDBCardText>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/* Main content */}
                    <MDBCol lg="8" className="order-2">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="mb-0">المعلومات الشخصية</h4>
                                    {children.length > 1 && (
                                        <span className="badge bg-info">
                                            {children.findIndex(c => c._id === displayStudent._id) + 1} من {children.length}
                                        </span>
                                    )}
                                </div>

                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText className="fw-bold">{displayStudent.name}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">الاسم الكامل</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText className="fw-bold">{displayStudent.age} سنة</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">العمر</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText className="fw-bold">الصف {displayStudent.class}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">الصف الدراسي</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText className="fw-bold">{parentData?.email}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">البريد الإلكتروني</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText className="fw-bold">{parentData?.phoneNumber}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">رقم الهاتف</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText className="fw-bold">{parentData?.address}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">العنوان</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />

                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText className="fw-bold">{parentData?.parentName}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">اسم ولي الأمر</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

export default ProfileStudent;
