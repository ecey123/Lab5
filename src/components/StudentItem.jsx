export default function StudentItem({ student, onDelete }) {
  const passed = student.grade >= 60;

  return (
    <li className={`student-item ${passed ? "student-pass" : "student-fail"}`}>
      <span className="student-name">{student.name}</span>

      <span className="student-grade">
        {student.grade}
        <span className="student-status">{passed ? "Pass" : "Fail"}</span>
      </span>

      <button className="delete-btn" onClick={() => onDelete(student.id)}>
        Delete
      </button>
    </li>
  );
}
