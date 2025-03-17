import React, { useState } from "react";
import "./App.css";

function App() {
  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [payer, setPayer] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const addPerson = () => {
    const name = document.getElementById("nameInput").value.trim();
    if (name && !people.includes(name)) {
      setPeople([...people, name]);
    }
    document.getElementById("nameInput").value = "";
  };

  const addExpense = () => {
    if (payer && item && amount && selectedUsers.length > 0) {
      setExpenses([
        ...expenses,
        { payer, item, amount: parseFloat(amount), sharedAmong: [...selectedUsers] },
      ]);
      setPayer("");
      setItem("");
      setAmount("");
      setSelectedUsers([]);
    }
  };

  const handleUserSelection = (user) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  const calculateExpenses = () => {
    let individualExpenses = {};
    people.forEach((person) => {
      individualExpenses[person] = {
        paid: 0,
        commonShare: 0,
        exclusiveShare: 0,
        totalShare: 0,
        netAmount: 0,
      };
    });

    expenses.forEach(({ payer, amount, sharedAmong }) => {
      individualExpenses[payer].paid += amount;

      if (sharedAmong.length === 1) {
        individualExpenses[sharedAmong[0]].exclusiveShare += amount;
      } else {
        let sharePerPerson = amount / sharedAmong.length;
        sharedAmong.forEach((user) => {
          individualExpenses[user].commonShare += sharePerPerson;
        });
      }
    });

    people.forEach((person) => {
      individualExpenses[person].totalShare =
        individualExpenses[person].commonShare +
        individualExpenses[person].exclusiveShare;
      individualExpenses[person].netAmount =
        individualExpenses[person].paid - individualExpenses[person].totalShare;
    });

    return individualExpenses;
  };

  const individualExpenses = calculateExpenses();

  return (
    <div className="container">
      <h1>Trip Expense Tracker</h1>
      <div className="section">
        <h2>Add People</h2>
        <input id="nameInput" type="text" placeholder="Enter Name" />
        <button onClick={addPerson}>Add Person</button>
        <ul>
          {people.map((person, index) => (
            <li key={index}>{person}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Add Expense</h2>
        <select onChange={(e) => setPayer(e.target.value)} value={payer}>
          <option value="">Select Payer</option>
          {people.map((person, index) => (
            <option key={index} value={person}>{person}</option>
          ))}
        </select>
        <input type="text" placeholder="Enter Item" value={item} onChange={(e) => setItem(e.target.value)} />
        <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <h3>Select Users Who Used This Item:</h3>
        {people.map((person, index) => (
          <label key={index}>
            <input type="checkbox" checked={selectedUsers.includes(person)} onChange={() => handleUserSelection(person)} />
            {person}
          </label>
        ))}
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <h2>Expenses Table</h2>
      <table>
        <thead>
          <tr>
            <th>Payer</th>
            <th>Item</th>
            <th>Amount</th>
            <th>Shared Among</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.payer}</td>
              <td>{expense.item}</td>
              <td>₹{expense.amount.toFixed(2)}</td>
              <td>{expense.sharedAmong.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Individual Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Money Given</th>
            <th>Common Items Share</th>
            <th>Exclusive Items Share</th>
            <th>Total Share</th>
            <th>Net Amount</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{person}</td>
              <td>₹{individualExpenses[person].paid.toFixed(2)}</td>
              <td>₹{individualExpenses[person].commonShare.toFixed(2)}</td>
              <td>₹{individualExpenses[person].exclusiveShare.toFixed(2)}</td>
              <td>₹{individualExpenses[person].totalShare.toFixed(2)}</td>
              <td style={{ color: individualExpenses[person].netAmount >= 0 ? "green" : "red" }}>
                ₹{individualExpenses[person].netAmount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
