import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllTeachers } from '../../../../../redux/Teachers/teacherSlice';
import '../../../../../App.css'
import './Teachers.css'

function AllTeachers() {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.auth.teachers);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    // Dispatch the action to fetch all teachers when the component mounts
    dispatch(getAllTeachers());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h1>Listes des profes</h1>
      </div>
      <br />
      <div className="container mt-3 mb-4">
        <div className="col-lg-9 mt-4 mt-lg-0">
          <div className="row">
            <div className="col-md-12">
              <div className="user-dashboard-info-box table-responsive bg-white shadow-sm">
                <table className="table manage-candidates-top mb-0">
                  <thead>
                    <tr>
                      <th>Teacher Name</th>
                      <th className="text-center">Subject</th>
                      <th className="action text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr className="candidates-list" key={teacher.id}>
                        <td className="title">
                          <div className="thumb">
                            <img className="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt />
                          </div>
                          <div className="candidate-list-details">
                            <div className="candidate-list-info">
                              <div className="candidate-list-title">
                                <h5 className="mb-0">{teacher.name}</h5>
                              </div>
                              <div className="candidate-list-option">
                                <ul className="list-unstyled">
                                  <li><i className="fas fa-filter pr-1" />{teacher.subject}</li>
                                  <li><i className="fas fa-map-marker-alt pr-1" />{teacher.location}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="candidate-list-favourite-time text-center">
                          <a className="candidate-list-favourite order-2 text-danger" href="#"><i className="fas fa-heart" /></a>
                          <span className="candidate-list-time order-1">Shortlisted</span>
                        </td>
                        <td>
                          <ul className="list-unstyled mb-0 d-flex justify-content-end">
                            <li><a href="#" className="text-primary" data-toggle="tooltip" title data-original-title="view"><i className="far fa-eye" /></a></li>
                            <li><a href="#" className="text-info" data-toggle="tooltip" title data-original-title="Edit"><i className="fas fa-pencil-alt" /></a></li>
                            <li><a href="#" className="text-danger" data-toggle="tooltip" title data-original-title="Delete"><i className="far fa-trash-alt" /></a></li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-center mt-3 mt-sm-3">
                  <ul className="pagination justify-content-center mb-0">
                    <li className="page-item disabled"> <span className="page-link">Prev</span> </li>
                    <li className="page-item active" aria-current="page"><span className="page-link">1 </span> <span className="sr-only">(current)</span></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">...</a></li>
                    <li className="page-item"><a className="page-link" href="#">25</a></li>
                    <li className="page-item"> <a className="page-link" href="#">Next</a> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTeachers;
