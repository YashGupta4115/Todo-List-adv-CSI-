import React from 'react';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../src/Components/HomePage/homePage.component';

test('adds a new task', () => {
  render(<HomePage />);

  const input = screen.getByPlaceholderText('add Todo'); // Adjust based on your input field
  const addButton = screen.getByText('Add Todo'); // Adjust based on your button text

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  expect(screen.getByText('New Task')).toBeInTheDocument();
});

test('remove a task', () => {
  render(<HomePage />);

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  expect(screen.queryByText('New Task')).not.toBeInTheDocument();
})

test('marks and Unmarks a task as completed', () => {
  render(<HomePage />);

  const input = screen.getByPlaceholderText('add Todo'); // Adjust based on your input field
  const addButton = screen.getByText('Add Todo'); // Adjust based on your button text

  fireEvent.change(input, { target: { value: 'Task to be completed' } });
  fireEvent.click(addButton);

  // Mark the task as completed
  const completeCheckbox = screen.getByRole('checkbox', {
    name: /Complete Task to be completed/i
  });
  fireEvent.click(completeCheckbox);

  expect(completeCheckbox).toBeChecked();
  expect(screen.getByText('Task to be completed')).toBeInTheDocument();
  fireEvent.click(completeCheckbox);

  expect(completeCheckbox).not.toBeChecked();
  expect(screen.getByText('Task to be completed')).toBeInTheDocument();

});

test('edit-> add new todo, cancel editing', () => {
  render(<HomePage />);

  let editTodoButton = screen.getByRole('editIcon', {
    name: /start editing/i
  })
  fireEvent.click(editTodoButton)

  const input = screen.getByPlaceholderText('new todo');
  const addButton = screen.getByText('Save');

  fireEvent.change(input, { target: { value: 'New Todo added' } });
  fireEvent.click(addButton);

  expect(screen.getByText('New Todo added')).toBeInTheDocument();

  editTodoButton = screen.getByRole('editIcon', {
    name: /start editing/i
  })
  fireEvent.click(editTodoButton)
  const canceButton = screen.getByText('Cancel');
  fireEvent.click(canceButton);

  expect(screen.getByText('New Todo added')).toBeInTheDocument();

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);
  expect(screen.queryByText('New Todo added')).not.toBeInTheDocument();
})

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('invalid Or Empty Input', async () => {
  render(<HomePage />)

  const input = screen.getByPlaceholderText('add Todo');
  const addButton = screen.getByText('Add Todo');

  fireEvent.change(input, { targer: { value: '' } });
  fireEvent.click(addButton);

  expect(input).toHaveClass('borderAlert');

  // Fast-forward time by 500ms
  jest.advanceTimersByTime(500);

  // Assert that the borderAlert class is removed
  await waitFor(() => expect(input).not.toHaveClass('borderAlert'));
})

const todos = [
  { id: 1, title: 'Task B', date: '2024-06-12' },
  { id: 2, title: 'Task A', date: '2024-06-14' },
  { id: 3, title: 'Task C', date: '2024-06-11' }
]

test('sort by ascending Order', () => {
  render(<HomePage />)

  todos.forEach(task => addTask(task.title, task.date));

  const openSort = screen.getByRole('selectSort', { name: /select Sort/i });
  fireEvent.change(openSort, { target: { value: 'sortByAscdn' } });

  const sortTitles = screen.getAllByRole('checkbox').map(checkbox => checkbox.nextSibling.textContent);
  console.log(sortTitles); // Debug log to check the initial order


  expect(sortTitles).toEqual(['Task A', 'Task B', 'Task C']);
})

test('sort by Descending Order', () => {
  render(<HomePage />)

  const openSort = screen.getByRole('selectSort', { name: /select Sort/i });
  fireEvent.change(openSort, { target: { value: 'sortByDesdn' } });

  const sortTitles = screen.getAllByRole('checkbox').map(checkbox => checkbox.nextSibling.textContent);
  console.log(sortTitles); // Debug log to check the initial order


  expect(sortTitles).toEqual(['Task C', 'Task B', 'Task A']);
})

const addTask = (title, date) => {
  fireEvent.change(screen.getByPlaceholderText('add Todo'), { target: { value: title } });
  fireEvent.click(screen.getByText('Add Todo'));
};

test('filter by today', () => {
  render(<HomePage/>)

  const openFilter = screen.getByRole('selectFilter', { name: /select Filter/i });
  fireEvent.change(openFilter, { target: { value: 'todayFilter' } });

  const sortTitles = screen.getAllByRole('checkbox').map(checkbox => checkbox.nextSibling.textContent);
  console.log(sortTitles); // Debug log to check the initial order


  expect(sortTitles).toEqual(['Task B', 'Task A', 'Task C']);
})

test('filter by Upcoming', () => {
  render(<HomePage/>)

  const openFilter = screen.getByRole('selectFilter', { name: /select Filter/i });
  fireEvent.change(openFilter, { target: { value: 'upComingFilter' } });

  const sortTitles = screen.getAllByRole('checkbox').map(checkbox => checkbox.nextSibling.textContent);
  console.log(sortTitles); // Debug log to check the initial order


  expect(sortTitles).toEqual(['Task B', 'Task A', 'Task C']);
})