import React, { useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const MarathonRegistrationForm = ({ marathon, onRegistered }) => {
  const { user } = useContext(AuthContext);

  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    additionalInfo: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async e => {
    e.preventDefault();

    if (!user || !user.email) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'Please log in to register for the marathon.',
      });
      return;
    }

    const registrationInfo = {
      email: user.email,
      marathonId: marathon._id,
      marathonTitle: marathon.title,
      registrationStart: marathon.registrationStart,
      ...registrationData,
      date: new Date().toISOString()
    };

    try {
      const res = await fetch(`https://marathon-server-azure.vercel.app/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationInfo)
      });

      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Server responded with an error.',
        });
        return;
      }

      const result = await res.json();

      if (result.insertedId) {
        await fetch(`https://marathon-server-azure.vercel.app/marathons/${marathon._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            registrationCount: (marathon.registrationCount || 0) + 1
          })
        });

        Swal.fire({
          icon: 'success',
          title: 'Congrats!',
          text: 'Your marathon registration was successful.',
          timer: 2500,
          showConfirmButton: false,
        });

        onRegistered();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registration failed! Please try again.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };

  return (
    <form onSubmit={handleRegister} className="mt-6 space-y-4 bg-gray-100 p-4 rounded max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-2">Register for Marathon</h3>

      <input
        type="email"
        value={user?.email || ''}
        disabled
        className="input input-bordered w-full"
        placeholder="Email"
      />

      <input
        type="text"
        value={marathon?.title || ''}
        disabled
        className="input input-bordered w-full"
        placeholder="Marathon Title"
      />

      <input
        type="text"
        value={marathon?.registrationStart || ''}
        disabled
        className="input input-bordered w-full"
        placeholder="Registration Start Date"
      />

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="input input-bordered w-full"
        value={registrationData.firstName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="input input-bordered w-full"
        value={registrationData.lastName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        className="input input-bordered w-full"
        value={registrationData.contact}
        onChange={handleChange}
        required
      />

      <textarea
        name="additionalInfo"
        placeholder="Additional Info"
        className="textarea textarea-bordered w-full"
        value={registrationData.additionalInfo}
        onChange={handleChange}
      />

      <button type="submit" className="btn btn-primary w-full">Submit Registration</button>
    </form>
  );
};

export default MarathonRegistrationForm;
