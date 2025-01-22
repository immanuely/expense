const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://bintang:123@cluster0.gzdfphf.mongodb.net/expense', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(console.log("DB connected"));

const ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', ExpenseSchema);

app.get('/', (req, res) => {
    res.send('backend running');
  });

app.get('/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post('/expenses', async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.json(newExpense);
});

app.delete('/expenses/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));