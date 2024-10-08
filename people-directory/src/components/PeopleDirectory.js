import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

const PeopleDirectory = () => {
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const peoplePerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    username: '',
    role: '',
    email: '',
    status: 'Active',
    teams: []
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterTeam, setFilterTeam] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRoleOptionsOpen, setIsRoleOptionsOpen] = useState(false);
  const [isTeamOptionsOpen, setIsTeamOptionsOpen] = useState(false);

  useEffect(() => {
    // Generate fake data using faker
    const generatePeople = () => {
      const peopleData = [];
      for (let i = 0; i < 100; i++) {
        peopleData.push({
          id: i,
          name: faker.person.fullName(),
          username: faker.internet.userName(),
          role: faker.person.jobTitle(),
          email: faker.internet.email(),
          status: Math.random() > 0.5 ? "Active" : "Inactive",
          teams: ["Design", "Product", "Marketing", "Finance", "HR", "Sales"]
        });
      }
      setPeople(peopleData);
    };

    generatePeople();
  }, []);

  // Filtering logic
  const filteredPeople = people
    .filter(person => {
      const matchesSearchTerm = person.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'All' || person.role === filterRole;
      const matchesTeam = filterTeam === 'All' || person.teams.includes(filterTeam);
      return matchesSearchTerm && matchesRole && matchesTeam;
    });

  // Sorting logic
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const currentPeople = sortedPeople.slice(indexOfFirstPerson, indexOfLastPerson);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPeople.length / peoplePerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddMember = () => {
    setIsModalOpen(true);
  };

  const handleSaveMember = () => {
    setPeople([...people, { ...newMember, id: people.length + 1 }]);
    setIsModalOpen(false);
    setNewMember({
      name: '',
      username: '',
      role: '',
      email: '',
      status: 'Active',
      teams: []
    });
  };

  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleViewDetails = (person) => {
    setSelectedPerson(person);
    setIsDetailModalOpen(true);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsRoleOptionsOpen(false);
    setIsTeamOptionsOpen(false);
  };

  const toggleRoleOptions = () => {
    setIsRoleOptionsOpen(!isRoleOptionsOpen);
    setIsTeamOptionsOpen(false);
  };

  const toggleTeamOptions = () => {
    setIsTeamOptionsOpen(!isTeamOptionsOpen);
    setIsRoleOptionsOpen(false);
  };

  return (
<div className="p-6 bg-white rounded shadow-md h-1200 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Left Section: Team members and user count */}
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-semibold">Team members</h2>
          <span className="text-sm bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
            {filteredPeople.length} users
          </span>
        </div>
        
        {/* Right Section: Search, Filter, and Add Member */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <svg
              className="absolute top-3 right-3 w-5 h-5 text-purple-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m2.35-7.65a8 8 0 11-16 0 8 8 0 0116 0z"
              />
            </svg>
          </div>
          <div className="relative">
            <button
              className="p-2 bg-gray-200 rounded focus:outline-none"
              onClick={toggleFilter}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1h-4l-4 5v5a1 1 0 01-.293.707l-2 2A1 1 0 019 19v-4l-4-5H3a1 1 0 01-1-1V4z"
                />
              </svg>
            </button>
            {isFilterOpen && (
              <div className="absolute top-12 right-0 w-64 bg-white border rounded shadow-lg p-4 z-10">
                <h3 className="font-semibold mb-2">Filters</h3>
                <div className="mb-2">
                  <button
                    className="w-full text-left p-2 border rounded bg-gray-100 hover:bg-gray-200 focus:outline-none"
                    onClick={toggleRoleOptions}
                  >
                    Roles
                  </button>
                  {isRoleOptionsOpen && (
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="p-2 border rounded w-full mt-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="All">All Roles</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="Designer">Designer</option>
                    </select>
                  )}
                </div>
                <div>
                  <button
                    className="w-full text-left p-2 border rounded bg-gray-100 hover:bg-gray-200 focus:outline-none"
                    onClick={toggleTeamOptions}
                  >
                    Teams
                  </button>
                  {isTeamOptionsOpen && (
                    <select
                      value={filterTeam}
                      onChange={(e) => setFilterTeam(e.target.value)}
                      className="p-2 border rounded w-full mt-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="All">All Teams</option>
                      <option value="Design">Design</option>
                      <option value="Product">Product</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                      <option value="Sales">Sales</option>
                    </select>
                  )}
                </div>
              </div>
            )}
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">+ Add Member</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
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
            {currentPeople.map((person) => (
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
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${person.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {person.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">{person.role}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{person.email}</td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {person.teams.slice(0, 3).map((team, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 mr-1 mb-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                    >
                      {team}
                    </span>
                  ))}
                  {person.teams.length > 3 && (
                    <button
                      className="text-blue-600 text-xs font-semibold"
                      onClick={() => handleViewDetails(person)}
                    >
                      +{person.teams.length - 3}
                    </button>
                  )}
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-900 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {Math.ceil(filteredPeople.length / peoplePerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredPeople.length / peoplePerPage)}
          className="bg-blue-900 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[32rem] shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Member</h2>
            <div className="flex flex-col items-center mb-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="rounded-full mb-4"
              />
              <div className="flex space-x-2">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full mb-2 hover:bg-gray-300">
                  Change Photo
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full mb-2 hover:bg-gray-300">
                  Remove Photo
                </button>
              </div>
            </div>

            {/* Grid layout with 3 columns */}
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={newMember.email}
                onChange={handleInputChange}
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={newMember.username}
                onChange={handleInputChange}
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="text"
                placeholder="Role"
                name="role"
                value={newMember.role}
                onChange={handleInputChange}
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                name="status"
                value={newMember.status}
                onChange={handleInputChange}
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                type="text"
                placeholder="Teams (comma separated)"
                name="teams"
                value={newMember.teams.join(', ')}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    teams: e.target.value.split(',').map((team) => team.trim())
                  })
                }
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Personal Information Input Fields */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="date"
                  placeholder="Date of Birth"
                  name="dob"
                  value={newMember.dob}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <select
                  name="gender"
                  value={newMember.gender}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Nationality"
                  name="nationality"
                  value={newMember.nationality}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="text"
                  placeholder="Contact no."
                  name="contact"
                  value={newMember.contact}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="email"
                  placeholder="E-mail Address"
                  name="personalEmail"
                  value={newMember.personalEmail}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="email"
                  placeholder="Work Email Address"
                  name="workEmail"
                  value={newMember.workEmail}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={handleSaveMember}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Information Modal */}
      {isDetailModalOpen && selectedPerson && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[40rem]">
            {/* Header Section */}
            <div className="flex justify-between items-center bg-indigo-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center">
                <img
                  src={faker.image.avatar()}
                  alt="Profile"
                  className="rounded-full w-16 h-16"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{selectedPerson.name}</h2>
                  <p className="text-sm">@{selectedPerson.username}</p>
                  <p className="text-sm">{selectedPerson.role}</p>
                </div>
              </div>
              <button
                className="text-white hover:text-gray-300"
                onClick={() => setIsDetailModalOpen(false)}
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Personal Information Section */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Date of Birth:</span> 29-04-2005
                  </div>
                  <div>
                    <span className="font-semibold">Gender:</span> Female
                  </div>
                  <div>
                    <span className="font-semibold">Nationality:</span> Canadian
                  </div>
                  <div>
                    <span className="font-semibold">Contact no.:</span> 1234567890
                  </div>
                  <div>
                    <span className="font-semibold">E-mail Address:</span> {selectedPerson.email}
                  </div>
                  <div>
                    <span className="font-semibold">Work email Address:</span> {selectedPerson.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Research & Publication Section */}
            <div className="px-6 pb-6">
              <h3 className="text-lg font-semibold mb-3">Research & Publication</h3>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="font-semibold">
                  AI and User Experience: The Future of Design
                </p>
                <p className="text-sm text-gray-600">
                  Published in the Journal of Modern Design • 2022
                </p>
                <p className="text-sm text-gray-600">
                  AI, IoT-based real-time condition monitoring of Electrical Machines using Python language Abstract:
                  Maintaining induction motors in good working order before they fail benefits small...
                </p>
                <a href="#" className="text-orange-600 font-semibold text-sm mt-2 inline-flex items-center">
                  <i className="fas fa-arrow-right mr-1"></i> SEE PUBLICATION
                </a>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsDetailModalOpen(false)} // Close the modal on click
                className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleDirectory;