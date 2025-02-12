import Layout from '../components/Layout';
    import { useState, useEffect } from 'react';

    export default function Members() {
      const [members, setMembers] = useState([]);
      const [newMember, setNewMember] = useState({
        name: '',
        id: '',
        department: '',
        email: '',
        mobile: '',
      });
      const [addMemberMessage, setAddMemberMessage] = useState('');
      const [errors, setErrors] = useState({});
      const [searchTerm, setSearchTerm] = useState('');

      useEffect(() => {
        const savedMembers = localStorage.getItem('members');
        if (savedMembers) {
          try {
            setMembers(JSON.parse(savedMembers));
          } catch (error) {
            console.error("Error parsing members from localStorage:", error);
            localStorage.removeItem('members');
          }
        }
      }, []);

      useEffect(() => {
        if (members.length > 0) {
          localStorage.setItem('members', JSON.stringify(members));
        }
      }, [members]);

      const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!newMember.name.trim()) {
          newErrors.name = 'Name is required';
          isValid = false;
        }
        if (!newMember.id.trim()) {
          newErrors.id = 'ID is required';
          isValid = false;
        }
        if (!newMember.department.trim()) {
          newErrors.department = 'Department is required';
          isValid = false;
        }
        if (!newMember.email.trim()) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMember.email)) {
          newErrors.email = 'Invalid email format';
          isValid = false;
        }
        if (!newMember.mobile.trim()) {
          newErrors.mobile = 'Mobile Number is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      const addMember = async () => {
        if (validateForm()) {
          const now = new Date();
          const memberWithDate = { ...newMember, id: newMember.id, createdAt: now.toISOString() };
          setMembers([...members, memberWithDate]);
          setNewMember({ name: '', id: '', department: '', email: '', mobile: '' });
          setAddMemberMessage('Member added successfully!');
          setErrors({});
          setTimeout(() => setAddMemberMessage(''), 3000);
        }
      };

      const deleteMember = async (id) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
          setMembers(members.filter((member) => member.id !== id));
        }
      };

      const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.department.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <Layout>
          <h1 className="text-3xl font-bold mb-6 dark:text-gray-200">Members</h1>

          {addMemberMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> {addMemberMessage}</span>
            </div>
          )}

          <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : ''
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500 text-sm dark:text-red-400">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="ID"
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.id ? 'border-red-500' : ''
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  value={newMember.id}
                  onChange={(e) => setNewMember({ ...newMember, id: e.target.value })}
                />
                {errors.id && <p className="text-red-500 text-sm dark:text-red-400">{errors.id}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Department"
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.department ? 'border-red-500' : ''
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  value={newMember.department}
                  onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                />
                {errors.department && <p className="text-red-500 text-sm dark:text-red-400">{errors.department}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : ''
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-sm dark:text-red-400">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Mobile"
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.mobile ? 'border-red-500' : ''
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  value={newMember.mobile}
                  onChange={(e) => setNewMember({ ...newMember, mobile: e.target.value })}
                />
                {errors.mobile && <p className="text-red-500 text-sm dark:text-red-400">{errors.mobile}</p>}
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
              onClick={addMember}
            >
              Add Member
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left dark:text-gray-200">Name</th>
                    <th className="px-4 py-2 text-left dark:text-gray-200">ID</th>
                    <th className="px-4 py-2 text-left dark:text-gray-200">Department</th>
                    <th className="px-4 py-2 text-left dark:text-gray-200">Email</th>
                    <th className="px-4 py-2 text-left dark:text-gray-200">Mobile</th>
                    <th className="px-4 py-2 text-left dark:text-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, index) => (
                    <tr key={member.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'dark:bg-gray-800'}>
                      <td className="border px-4 py-2 dark:text-gray-200">{member.name}</td>
                      <td className="border px-4 py-2 dark:text-gray-200">{member.id}</td>
                      <td className="border px-4 py-2 dark:text-gray-200">{member.department}</td>
                      <td className="border px-4 py-2 dark:text-gray-200">{member.email}</td>
                      <td className="border px-4 py-2 dark:text-gray-200">{member.mobile}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          onClick={() => deleteMember(member.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      );
    }
