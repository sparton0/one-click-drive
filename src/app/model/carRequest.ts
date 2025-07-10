// import { Schema, model, models } from "mongoose";
// import defaultpic from "../public/default.png";

// Initial car request data
const initialCarRequests = [
    { id: 1, name: 'Alice Johnson', phone: '9876543210', car_model: 'Toyota Camry', duration: '1 day', status: 'Pending' },
    { id: 2, name: 'Bob Smith', phone: '9876543211', car_model: 'Honda Accord', duration: '3 days', status: 'Approved' },
    { id: 3, name: 'Carol Williams', phone: '9876543212', car_model: 'Hyundai Elantra', duration: '2 days', status: 'Rejected' },
    { id: 4, name: 'David Brown', phone: '9876543213', car_model: 'Kia Seltos', duration: '4 days', status: 'Pending' },
    { id: 5, name: 'Eve Davis', phone: '9876543214', car_model: 'BMW X3', duration: '2 days', status: 'Approved' },
    { id: 6, name: 'Frank Miller', phone: '9876543215', car_model: 'Audi A4', duration: '1 day', status: 'Pending' },
    { id: 7, name: 'Grace Wilson', phone: '9876543216', car_model: 'Nissan Altima', duration: '5 days', status: 'Approved' },
    { id: 8, name: 'Harry Moore', phone: '9876543217', car_model: 'Volkswagen Passat', duration: '2 days', status: 'Rejected' },
    { id: 9, name: 'Irene Taylor', phone: '9876543218', car_model: 'Chevrolet Malibu', duration: '1 day', status: 'Pending' },
    { id: 10, name: 'Jack Anderson', phone: '9876543219', car_model: 'Tesla Model 3', duration: '3 days', status: 'Approved' },
    { id: 11, name: 'Kate Thomas', phone: '9876543220', car_model: 'Ford Focus', duration: '2 days', status: 'Pending' },
    { id: 12, name: 'Leo Jackson', phone: '9876543221', car_model: 'Jeep Compass', duration: '4 days', status: 'Rejected' },
    { id: 13, name: 'Mia White', phone: '9876543222', car_model: 'Mercedes C-Class', duration: '1 day', status: 'Approved' },
    { id: 14, name: 'Nate Harris', phone: '9876543223', car_model: 'Skoda Superb', duration: '2 days', status: 'Pending' },
    { id: 15, name: 'Olivia Martin', phone: '9876543224', car_model: 'Volvo S60', duration: '3 days', status: 'Approved' }
];

// In a real app, this would be a database
// For this demo, we'll use localStorage in the browser and a module variable in Node.js
let carRequests = [...initialCarRequests];

// Helper functions for managing car requests
export function getCarRequests() {
  // Return a copy of the car requests to avoid direct mutation
  return [...carRequests];
}

export function updateCarRequestStatus(id: number, status: string) {
  const index = carRequests.findIndex(req => req.id === id);
  
  if (index === -1) {
    return null;
  }
  
  carRequests[index] = {
    ...carRequests[index],
    status
  };
  
  return carRequests[index];
}

export function addCarRequest(request: any) {
  // Generate a new ID
  const newId = Math.max(...carRequests.map(req => req.id)) + 1;
  
  const newRequest = {
    ...request,
    id: newId,
    status: request.status || 'Pending'
  };
  
  carRequests.push(newRequest);
  return newRequest;
}

export function resetCarRequests() {
  carRequests = [...initialCarRequests];
  return carRequests;
}

export default initialCarRequests;
