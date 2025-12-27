import { useMemo, useState } from "react";
import "./styles/lab-styles.css";

import StudentForm from "./components/StudentForm";
import StudentControls from "./components/StudentControls";
import StudentList from "./components/StudentList";

const initialStudents = [
  { id: 1, name: "Ali", grade: 85 },
  { id: 2, name: "Siti", grade: 72 },
  { id: 3, name: "Rahim", grade: 55 },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);

  // Milestone 4 state
  const [filter, setFilter] = useState("all"); // all | pass | fail
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDir, setSortDir] = useState("desc"); // desc: High→Low, asc: Low→High

  const addStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // visibleStudents = filter + search + sort (derived)
  const visibleStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    let list = students;

    // filter pass/fail
    if (filter === "pass") list = list.filter((s) => s.grade >= 60);
    if (filter === "fail") list = list.filter((s) => s.grade < 60);

    // search by name
    if (term) list = list.filter((s) => s.name.toLowerCase().includes(term));

    // sort by grade
    const sorted = [...list].sort((a, b) =>
      sortDir === "desc" ? b.grade - a.grade : a.grade - b.grade
    );

    return sorted;
  }, [students, filter, searchTerm, sortDir]);

  const searchNoMatch =
    searchTerm.trim() !== "" && visibleStudents.length === 0;

  return (
    <div className="app">
      <h1 className="header">Student Dashboard</h1>

      <StudentForm onAdd={addStudent} students={students} />

      {/* Search is controlled by App.jsx (chosen approach) */}
      <StudentControls
        filter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortDir={sortDir}
        onToggleSort={() =>
          setSortDir((prev) => (prev === "desc" ? "asc" : "desc"))
        }
      />

      {/* Milestone 4: No match message */}
      {searchNoMatch ? (
        <p className="no-data">
          No students match “<em>{searchTerm.trim()}</em>”
        </p>
      ) : (
        <StudentList students={visibleStudents} onDelete={deleteStudent} />
      )}
    </div>
  );
}
