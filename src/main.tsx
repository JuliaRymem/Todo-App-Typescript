/* eslint-disable */
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

/**
 * En enkel Todo-typ:
 * - id: unikt nummer
 * - text: själva uppgiftens text
 * - done: om uppgiften är klar
 * - deadline?: valfri datumsträng (yyyy-mm-dd)
 */
type Todo = {
  id: number;
  text: string;
  done: boolean;
  deadline?: string;
};

function App() {
  // State: listan med todos
  const [todos, setTodos] = useState<Todo[]>([]);
  // State: kontroll av inputfälten
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");

  // Lägg till ny todo
  function addTodo() {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      done: false,
      deadline: deadline || undefined,
    };

    setTodos([newTodo, ...todos]);
    setText("");
    setDeadline("");
  }

  // Markera som klar / inte klar
  function toggleDone(id: number) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  // Ta bort en todo
  function removeTodo(id: number) {
    setTodos(todos.filter(t => t.id !== id));
  }

  // Redigera text
  function editText(id: number, newText: string) {
    setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));
  }

  // Redigera deadline
  function editDeadline(id: number, newDateStr: string) {
    setTodos(todos.map(t => t.id === id ? { ...t, deadline: newDateStr || undefined } : t));
  }

  // Enter-tangent i textfältet = lägg till
  function handleTextKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") addTodo();
  }

  return (
    <div className="app-container">
      <h1>Todo App</h1>

      {/* Inmatning */}
      <div className="input-row">
        <input
          placeholder="Skriv en todo…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleTextKeyDown}
          type="text"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={addTodo}>Lägg till</button>
      </div>

      {/* Lista */}
      <ul>
        {todos.length === 0 && <li>-</li>}

        {todos.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleDone(t.id)}
              />
              Klar
            </label>{" "}

            <input
              type="text"
              value={t.text}
              onChange={(e) => editText(t.id, e.target.value)}
            />{" "}

            <input
              type="date"
              value={t.deadline ?? ""}
              onChange={(e) => editDeadline(t.id, e.target.value)}
            />{" "}

            <button onClick={() => removeTodo(t.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Starta appen
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);