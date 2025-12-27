import { useState } from "react";

export default function StudentForm({ onAdd, students }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const numericGrade = Number(grade);

    // 1) empty name check
    if (!trimmedName) {
      setError("Name must not be empty.");
      return;
    }

    // 2) grade between 0 and 100
    if (Number.isNaN(numericGrade) || numericGrade < 0 || numericGrade > 100) {
      setError("Grade must be a number between 0 and 100.");
      return;
    }

    // 3) duplicate name (case-insensitive)
    const exists = students.some(
      (s) => s.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (exists) {
      setError("A student with the same name already exists.");
      return;
    }

    setError("");
    onAdd({ id: Date.now(), name: trimmedName, grade: numericGrade });

    // clear inputs
    setName("");
    setGrade("");
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input input-grade"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />

      <button className="btn" type="submit">
        Add
      </button>

      {error ? <span className="form-error">{error}</span> : null}
    </form>
  );
}
