import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

function AddStudent() {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    address: '',
    roomID: ''
  });
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const querySnapshot = await getDocs(collection(db, 'students'));
    const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStudents(studentsList);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'students', editingId), student);
        setEditingId(null);
        alert('Student updated successfully!');
      } else {
        await addDoc(collection(db, 'students'), student);
        alert('Student added successfully!');
      }
      setStudent({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        address: '',
        roomID: ''
      });
      getStudents();
    } catch (error) {
      alert('Failed to save student: ' + error.message);
    }
  };

  const editStudent = (student) => {
    setStudent(student);
    setEditingId(student.id);
  };

  const deleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, 'students', id));
      alert('Student deleted successfully!');
      getStudents();
    } catch (error) {
      alert('Failed to delete student: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>{editingId ? 'Edit Student' : 'Student Management form'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={student.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={student.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="gender">Gender</label>
        <select name="gender" value={student.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={student.dateOfBirth}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={student.phoneNumber}
          onChange={handleChange}
        />

        <label htmlFor="address">Address</label>
        <textarea
          name="address"
          placeholder="Address"
          value={student.address}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="roomID">Room ID</label>
        <input
          type="text"
          name="roomID"
          placeholder="Room ID"
          value={student.roomID}
          onChange={handleChange}
        />

        <button type="submit">{editingId ? 'Update Student' : 'Add Student'}</button>
      </form>

      <h2>Student List</h2>
      <div className="student-list">
        <ul>
          {students.map((stud) => (
            <li key={stud.id}>
              {stud.firstName} {stud.lastName} ({stud.email})
              <div>
                <button onClick={() => editStudent(stud)}>Edit</button>
                <button className="delete" onClick={() => deleteStudent(stud.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddStudent;



