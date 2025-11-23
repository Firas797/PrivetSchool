import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { getStudentsByTeacher } from "../../../redux/Teachers/teacherSlice";

export default function ListStudentsTeacher() {
  const dispatch = useDispatch();
  const { teacher, students } = useSelector(state => state.teacher);

  useEffect(() => {
    if (teacher?._id) {
      dispatch(getStudentsByTeacher(teacher._id));
    }
  }, [dispatch, teacher?._id]);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Liste des étudiants</h3>
      <MDBTable align="middle" hover responsive>
        <MDBTableHead color="light">
          <tr>
            <th>Parent</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Enfants</th>
            <th>Date d'inscription</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {students.map(user => (
            <tr key={user._id}>
              <td>{user.parentName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>
                {user.children.map((child, i) => (
                  <div key={i}>
                    {child.name} — {child.class}ème année
                  </div>
                ))}
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString("fr-FR")}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
