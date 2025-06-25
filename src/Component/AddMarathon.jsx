import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider'; // Adjust path according to your project

const AddMarathon = () => {
  const { user } = useContext(AuthContext);  // Get logged-in user info
  const [registrationStart, setRegistrationStart] = useState(null);
  const [registrationEnd, setRegistrationEnd] = useState(null);
  const [marathonDate, setMarathonDate] = useState(null);
  const [distance, setDistance] = useState('10k');
  const navigate = useNavigate();

  const handleAddMarathon = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Build marathon object with all fields including createdBy
    const newMarathon = {
      title: form.title.value,
      registrationStart,
      registrationEnd,
      marathonDate,
      location: form.location.value,
      distance,
      description: form.description.value,
      image: form.image.value,
      registrationCount: 0,
      createdAt: new Date(),
      createdBy: user?.email || 'testuser@example.com' // Must send createdBy!
    };

    try {
      const res = await fetch('https://marathon-server-azure.vercel.app/marathons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMarathon)
      });

      if (res.ok) {
        toast.success('Marathon added successfully!');
        form.reset();
        navigate('/dashboard/my-marathons'); // Redirect after success
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add marathon');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Marathon</h2>
      <form onSubmit={handleAddMarathon} className="space-y-4">

        <input name="title" type="text" placeholder="Marathon Title" className="input input-bordered w-full" required />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Registration Start</label>
            <DatePicker
              selected={registrationStart}
              onChange={setRegistrationStart}
              className="input input-bordered w-full"
              placeholderText="Select date"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Registration End</label>
            <DatePicker
              selected={registrationEnd}
              onChange={setRegistrationEnd}
              className="input input-bordered w-full"
              placeholderText="Select date"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Marathon Date</label>
            <DatePicker
              selected={marathonDate}
              onChange={setMarathonDate}
              className="input input-bordered w-full"
              placeholderText="Select date"
              required
            />
          </div>
        </div>

        <input name="location" type="text" placeholder="Location" className="input input-bordered w-full" required />

        <div>
          <label className="block mb-1 font-semibold">Running Distance</label>
          <select value={distance} onChange={(e) => setDistance(e.target.value)} className="select select-bordered w-full">
            <option value="25k">25k</option>
            <option value="10k">10k</option>
            <option value="3k">3k</option>
          </select>
        </div>

        <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required />

        <input name="image" type="url" placeholder="Image URL" className="input input-bordered w-full" required />

        <button type="submit" className="btn btn-primary w-full">Add Marathon</button>
      </form>
    </div>
  );
};

export default AddMarathon;
