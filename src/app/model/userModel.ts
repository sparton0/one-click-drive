import { Schema, model, models } from "mongoose";
// import { Schema, model, models } from "mongoose";
// import fs from 'fs/promises';
// import path from 'path';
// const initialUsers = [
//     {
//         id: 1,
//         name: "John Doe",
//         email: "john@example.com",
//         username: "johndoe",
//         password: "password123",
//         image: "/default.png"
//     },
//     {
//         id: 2,
//         name: "Jane Smith",
//         email: "jane@example.com",
//         username: "janesmith",
//         password: "password456",
//         image: "/default.png"
//     }

// Initial users data
const initialUsers = [
  { id: 1, name: 'John Smith', phone: '555-123-4567', city: 'New York', state: 'NY', zip: '10001', status: 'Active' },
  { id: 2, name: 'Emily Johnson', phone: '555-234-5678', city: 'Los Angeles', state: 'CA', zip: '90001', status: 'Active' },
  { id: 3, name: 'Michael Williams', phone: '555-345-6789', city: 'Chicago', state: 'IL', zip: '60601', status: 'Inactive' },
  { id: 4, name: 'Sarah Brown', phone: '555-456-7890', city: 'Houston', state: 'TX', zip: '77001', status: 'Active' },
  { id: 5, name: 'David Jones', phone: '555-567-8901', city: 'Phoenix', state: 'AZ', zip: '85001', status: 'Active' },
  { id: 6, name: 'Jennifer Garcia', phone: '555-678-9012', city: 'Philadelphia', state: 'PA', zip: '19019', status: 'Inactive' },
  { id: 7, name: 'Robert Miller', phone: '555-789-0123', city: 'San Antonio', state: 'TX', zip: '78201', status: 'Active' },
  { id: 8, name: 'Lisa Davis', phone: '555-890-1234', city: 'San Diego', state: 'CA', zip: '92101', status: 'Active' },
  { id: 9, name: 'Thomas Rodriguez', phone: '555-901-2345', city: 'Dallas', state: 'TX', zip: '75201', status: 'Inactive' },
  { id: 10, name: 'Michelle Martinez', phone: '555-012-3456', city: 'San Jose', state: 'CA', zip: '95101', status: 'Active' },
  { id: 11, name: 'Daniel Hernandez', phone: '555-112-3344', city: 'Austin', state: 'TX', zip: '73301', status: 'Active' },
  { id: 12, name: 'Jessica Lopez', phone: '555-223-4455', city: 'Jacksonville', state: 'FL', zip: '32099', status: 'Inactive' },
  { id: 13, name: 'James Gonzalez', phone: '555-334-5566', city: 'Fort Worth', state: 'TX', zip: '76101', status: 'Active' },
  { id: 14, name: 'Amanda Wilson', phone: '555-445-6677', city: 'Columbus', state: 'OH', zip: '43085', status: 'Active' },
  { id: 15, name: 'Kevin Anderson', phone: '555-556-7788', city: 'Charlotte', state: 'NC', zip: '28201', status: 'Inactive' },
  { id: 16, name: 'Melissa Thomas', phone: '555-667-8899', city: 'Indianapolis', state: 'IN', zip: '46201', status: 'Active' },
  { id: 17, name: 'Christopher Taylor', phone: '555-778-9900', city: 'Seattle', state: 'WA', zip: '98101', status: 'Active' },
  { id: 18, name: 'Ashley Moore', phone: '555-889-0011', city: 'Denver', state: 'CO', zip: '80201', status: 'Inactive' },
  { id: 19, name: 'Matthew Jackson', phone: '555-990-1122', city: 'Washington', state: 'DC', zip: '20001', status: 'Active' },
  { id: 20, name: 'Nicole Martin', phone: '555-001-2233', city: 'Boston', state: 'MA', zip: '02101', status: 'Active' },
  { id: 21, name: 'Andrew Lee', phone: '555-112-2334', city: 'Nashville', state: 'TN', zip: '37201', status: 'Inactive' },
  { id: 22, name: 'Stephanie Perez', phone: '555-223-3445', city: 'Portland', state: 'OR', zip: '97201', status: 'Active' },
  { id: 23, name: 'Joshua Thompson', phone: '555-334-4556', city: 'Las Vegas', state: 'NV', zip: '89101', status: 'Active' },
  { id: 24, name: 'Rebecca White', phone: '555-445-5667', city: 'Detroit', state: 'MI', zip: '48201', status: 'Inactive' },
  { id: 25, name: 'Brian Harris', phone: '555-556-6778', city: 'Memphis', state: 'TN', zip: '38101', status: 'Active' },
  { id: 26, name: 'Lauren Clark', phone: '555-667-7889', city: 'Oklahoma City', state: 'OK', zip: '73101', status: 'Active' },
  { id: 27, name: 'Justin Lewis', phone: '555-778-8990', city: 'Louisville', state: 'KY', zip: '40201', status: 'Inactive' },
  { id: 28, name: 'Heather Robinson', phone: '555-889-9001', city: 'Baltimore', state: 'MD', zip: '21201', status: 'Active' },
  { id: 29, name: 'Brandon Walker', phone: '555-990-0112', city: 'Milwaukee', state: 'WI', zip: '53201', status: 'Active' },
  { id: 30, name: 'Samantha Young', phone: '555-001-1223', city: 'Albuquerque', state: 'NM', zip: '87101', status: 'Inactive' }
];

let users = [...initialUsers];

export function getUsers() {
  return [...users];
}

export function getUserById(id: number) {
  return users.find(user => user.id === id) || null;
}

export function updateUserStatus(id: number, status: string) {
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    return null;
  }
  
  users[index] = {
    ...users[index],
    status
  };
  
  return users[index];
}

export function addUser(user: any) {
  const newId = Math.max(...users.map(user => user.id)) + 1;
  
  const newUser = {
    ...user,
    id: newId
  };
  
  users.push(newUser);
  return newUser;
}

export function resetUsers() {
  users = [...initialUsers];
  return users;
}

export default initialUsers;
