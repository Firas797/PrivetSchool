import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { fetchAllUsers } from '../../../../redux/LoginRegister/authSlice';

export default function ListStudents() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.auth.allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Title</th>
          <th scope='col'>Status</th>
          <th scope='col'>Position</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {allUsers.map((user) => (
          <tr key={user.id}>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{user.name}</p>
                  <p className='text-muted mb-0'>{user.email}</p>
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>Student</p>
              {/* You can replace 'Student' with the actual user title */}
              <p className='text-muted mb-0'>Class {user.childN}</p>
            </td>
            <td>
              <MDBBadge color='success' pill>
                Active
              </MDBBadge>
            </td>
            <td>Senior</td> {/* Replace with actual user position */}
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Edit
              </MDBBtn>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
