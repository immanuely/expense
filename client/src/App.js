import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/expenses').then((response) => {
      setExpenses(response.data);
    });
  }, []);

  const addExpense = () => {
    axios.post('http://localhost:5000/expenses', { title, amount }).then((response) => {
      setExpenses([...expenses, response.data]);
      setTitle('');
      setAmount('');
    });
  };

  const deleteExpense = (id) => {
    axios.delete(`http://localhost:5000/expenses/${id}`).then(() => {
      setExpenses(expenses.filter((expense) => expense._id !== id));
    });
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.title} - ${expense.amount}
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;