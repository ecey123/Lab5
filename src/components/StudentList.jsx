import StudentItem from "./StudentItem";

export default function StudentList({ students, onDelete }) {
  if (students.length === 0) {
    return <p className="no-data">No students yet — use the form above.</p>;
  }

  return (
    <ul className="student-list">
      {students.map((student) => (
        <StudentItem
          key={student.id}
          student={student}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
