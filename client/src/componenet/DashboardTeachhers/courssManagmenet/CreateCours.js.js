import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourseAsync } from '../../../redux/cours/coursSlice';
import '../../DashboardAdmin/SideBarAdmin/Side.css'; // Import the CSS file

const CreateCourse = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [classe, setClasse] = useState('');
  const [urlVid, setUrlVid] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleClasseChange = (e) => {
    setClasse(e.target.value);
  };

  const handleUrlVidChange = (e) => {
    setUrlVid(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data here if needed

    // Dispatch the action to create the course
    dispatch(
      addCourseAsync({
        Title: title,
        classe,
        urlVid,
        description,
        category,
      })
    );

    // Clear the form fields after successful course creation
    setTitle('');
    setClasse('');
    setUrlVid('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="container">
      <div className="row my-4 my-lg-5">
        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3 text-center">
          <p className="font-20 semi-font my-4">Create a new Course</p>
          <form className="create-course-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="classe">Class or Grade</label>
              <select
                id="classe"
                className="form-control"
                value={classe}
                onChange={handleClasseChange}
              >
                <option value="">Select Class</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="urlVid">Video URL</label>
              <input
                type="text"
                id="urlVid"
                className="form-control"
                value={urlVid}
                onChange={handleUrlVidChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="form-control"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
                <option value="4">Category 4</option>
                <option value="5">Category 5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
