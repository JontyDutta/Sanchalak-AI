export const stadiumData = {
  gates: {
    gateA: { name: 'Gate A (North)', currentCongestion: 85, capacity: 5000, waitTimeMinutes: 25 },
    gateB: { name: 'Gate B (East)', currentCongestion: 40, capacity: 5000, waitTimeMinutes: 8 },
    gateC: { name: 'Gate C (South)', currentCongestion: 60, capacity: 5000, waitTimeMinutes: 15 },
    gateD: { name: 'Gate D (West)', currentCongestion: 20, capacity: 5000, waitTimeMinutes: 4 },
  },
  facilities: {
    foodCourts: [
      { id: 'fc1', name: 'North Food Court', location: 'Level 1, Near Gate A', crowdLevel: 'High' },
      { id: 'fc2', name: 'South Food Court', location: 'Level 1, Near Gate C', crowdLevel: 'Low' },
      { id: 'fc3', name: 'VIP Lounge', location: 'Level 3, West Wing', crowdLevel: 'Medium' },
    ],
    medical: [
      { id: 'med1', name: 'Main First Aid', location: 'Ground Floor, Near Gate B', status: 'Available' },
      { id: 'med2', name: 'North Aid Station', location: 'Level 2, Section 214', status: 'Busy' },
    ],
    accessibility: [
      { id: 'acc1', name: 'Elevator Bank A', status: 'Operational', waitTime: '2 mins' },
      { id: 'acc2', name: 'Wheelchair Assistance Point', location: 'Gate D', status: 'Available' },
    ]
  },
  parking: {
    lot1: { name: 'VIP Parking', occupancyPercent: 95 },
    lot2: { name: 'General Parking North', occupancyPercent: 88 },
    lot3: { name: 'General Parking South', occupancyPercent: 45 },
  },
  incidents: [
    { id: 'inc1', type: 'Medical', location: 'Section B-214', status: 'Active', severity: 'High', timeReported: '10 mins ago' },
    { id: 'inc2', type: 'Lost Child', location: 'Gate C', status: 'Resolved', severity: 'Medium', timeReported: '45 mins ago' },
  ]
};
