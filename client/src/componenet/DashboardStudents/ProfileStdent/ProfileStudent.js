import React from 'react'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
  } from 'mdb-react-ui-kit';

function ProfileStudent() {
  return (
    <div>

    </div>,
    <section style={{ backgroundColor: '#eee' }}>
        <h1>هذا موقعك الخاص</h1>

        <MDBContainer className="py-5">
  <MDBRow>
    <MDBCol lg="4">
      <MDBCard className="mb-4">
        <MDBCardBody className="text-center">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
            alt="الصورة الشخصية"
            className="rounded-circle"
            style={{ width: '150px' }}
            fluid
          />
          <p className="text-muted mb-1">مطور Full Stack</p>
          <p className="text-muted mb-4">منطقة الخليج، سان فرانسيسكو، كاليفورنيا</p>
          <div className="d-flex justify-content-center mb-2">
            <MDBBtn>متابعة</MDBBtn>
            <MDBBtn outline className="ms-1">رسالة</MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>

      <MDBCard className="mb-4 mb-lg-0">
        <MDBCardBody className="p-0">
          <MDBListGroup flush className="rounded-3">
            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
              <MDBIcon fas icon="globe fa-lg text-warning" />
              <MDBCardText>https://mdbootstrap.com</MDBCardText>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
              <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
              <MDBCardText>mdbootstrap</MDBCardText>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
              <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
              <MDBCardText>@mdbootstrap</MDBCardText>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
              <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
              <MDBCardText>mdbootstrap</MDBCardText>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
              <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
              <MDBCardText>mdbootstrap</MDBCardText>
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    <MDBCol lg="8">
      <MDBCard className="mb-4">
        <MDBCardBody>
          <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className="text-muted">جوناثان سميث</MDBCardText>

            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText>الاسم الكامل</MDBCardText>

            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className="text-muted">example@example.com</MDBCardText>

            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText>البريد الإلكتروني</MDBCardText>

            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>

            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText>الهاتف</MDBCardText>

            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>

            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText>الجوال</MDBCardText>

            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className="text-muted">منطقة الخليج،</MDBCardText>

            </MDBCol>
            <MDBCol sm="9">
              <MDBCardText>العنوان</MDBCardText>

            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      <MDBRow>
        <MDBCol md="6">
          <MDBCard className="mb-4 mb-md-0">
            <MDBCardBody>
              <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">مهمة</span> حالة المشروع</MDBCardText>
              <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>تصميم الويب</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={80} valuemin={0} valuemax={100} />
              </MDBProgress>

              <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>علامات الويب</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={72} valuemin={0} valuemax={100} />
              </MDBProgress>

              <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>صفحة واحدة</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={89} valuemin={0} valuemax={100} />
              </MDBProgress>

              <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>قالب موبايل</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={55} valuemin={0} valuemax={100} />
              </MDBProgress>

              <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>واجهة برمجة التطبيقات</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={66} valuemin={0} valuemax={100} />
              </MDBProgress>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="mb-4 mb-md-0">
            <MDBCardBody>
              <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">مهمة</span> حالة المشروع</MDBCardText>
              <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>تصميم الويب</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={80} valuemin={0} valuemax={100} />
              </MDBProgress>

              <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>علامات الويب</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={72} valuemin={0} valuemax={100} />
              </MDBProgress>

              <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>صفحة واحدة</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={89} valuemin={0} valuemax={100} />
              </MDBProgress>

              <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>قالب موبايل</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={55} valuemin={0} valuemax={100} />
              </MDBProgress>

              <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>واجهة برمجة التطبيقات</MDBCardText>
              <MDBProgress className="rounded">
                <MDBProgressBar width={66} valuemin={0} valuemax={100} />
              </MDBProgress>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBCol>
  </MDBRow>
</MDBContainer>

    </section>
  )
}

export default ProfileStudent