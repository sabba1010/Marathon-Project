import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMarathon = () => {
  const { id } = useParams(); // get marathon ID from route param
  const navigate = useNavigate();

  const [marathon, setMarathon] = useState(null);

  // Form fields states
  const [registrationStart, setRegistrationStart] = useState(null);
  const [registrationEnd, setRegistrationEnd] = useState(null);
  const [marathonDate, setMarathonDate] = useState(null);
  const [distance, setDistance] = useState('10k');

  useEffect(() => {
    // Fetch marathon by ID on component mount
    fetch(`https://marathon-server-azure.vercel.app/marathons/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch marathon data');
        return res.json();
      })
      .then(data => {
        setMarathon(data);
        setRegistrationStart(data.registrationStart ? new Date(data.registrationStart) : null);
        setRegistrationEnd(data.registrationEnd ? new Date(data.registrationEnd) : null);
        setMarathonDate(data.marathonDate ? new Date(data.marathonDate) : null);
        setDistance(data.distance || '10k');
      })
      .catch(err => {
        toast.error(err.message);
      });
  }, [id]);

  const handleUpdateMarathon = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Prepare updated marathon data
    const updatedMarathon = {
      title: form.title.value,
      registrationStart,
      registrationEnd,
      marathonDate,
      location: form.location.value,
      distance,
      description: form.description.value,
      image: form.image.value,
    };

    try {
      const res = await fetch(`https://marathon-server-azure.vercel.app/marathons/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMarathon)
      });

      if (res.ok) {
        toast.success('Marathon updated successfully!');
        navigate('/dashboard/my-marathons'); // Redirect after update
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update marathon');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (!marathon) return <div className="text-center mt-20">Loading marathon data...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Marathon</h2>
      <form onSubmit={handleUpdateMarathon} className="space-y-4">

        <input
          name="title"
          type="text"
          placeholder="Marathon Title"
          className="input input-bordered w-full"
          required
          defaultValue={marathon.title}
        />

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

        <input
          name="location"
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
          required
          defaultValue={marathon.location}
        />

        <div>
          <label className="block mb-1 font-semibold">Running Distance</label>
          <select
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="25k">25k</option>
            <option value="10k">10k</option>
            <option value="3k">3k</option>
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
          defaultValue={marathon.description}
        />

        <input
          name="image"
          type="url"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
          defaultValue={marathon.image}
        />

        <button type="submit" className="btn btn-primary w-full">Update Marathon</button>
      </form>
    </div>
  );
};

export default UpdateMarathon;
