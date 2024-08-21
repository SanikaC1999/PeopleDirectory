import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

const PeopleDirectory = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Generate fake data using faker
    const generatePeople = () => {
      const peopleData = [];
      for (let i = 0; i < 10; i++) {
        peopleData.push({
          id: i,
          name: faker.name.findName(),
          username: faker.internet.userName(),
          role: faker.name.jobTitle(),
          email: faker.internet.email(),
          status: "Active",
          teams: ["Design", "Product", "Marketing"]
        });
      }
      setPeople(peopleData);
    };

    generatePeople();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Team members</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          + Add Member
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email Address
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teams
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {people.map((person) => (
            <tr key={person.id}>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={faker.image.avatar()}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {person.name}
                    </div>
                    <div className="text-sm text-gray-500">@{person.username}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {person.status}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-500">{person.role}</td>
              <td className="px-4 py-2 text-sm text-gray-500">{person.email}</td>
              <td className="px-4 py-2 text-sm text-gray-500">
                {person.teams.map((team, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 mr-1 mb-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                  >
                    {team}
                  </span>
                ))}
                +4
              </td>
              <td className="px-4 py-2 text-sm text-gray-500">
                <button className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button className="ml-2 text-gray-500 hover:text-gray-700">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleDirectory;
