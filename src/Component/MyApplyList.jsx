import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axiosSecure from '../api/axiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedReg, setSelectedReg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axiosSecure.get('/registrations', {
        params: { email: user.email },
      });
      setRegistrations(res.data);
    } catch (err) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchData();
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this registration!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/registrations/${id}`);
          toast.success('Registration deleted');
          fetchData();
        } catch (err) {
          toast.error('Delete failed');
        }
      }
    });
  };

  const handleUpdateOpen = (reg) => {
    setSelectedReg(reg);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      participantName: form.participantName.value,
      contactNumber: form.contactNumber.value,
      address: form.address.value,
    };

    setIsModalOpen(false);

    try {
      await axiosSecure.put(`/registrations/${selectedReg._id}`, updatedData);
      fetchData();
    } catch (error) {
      // Optional error logging
    } finally {
      Swal.fire({
        title: 'Congratulations!',
        text: 'Successfully Updated!',
        icon: 'success',
        confirmButtonText: 'Go to Home',
      }).then(() => {
        navigate('/');
      });
    }
  };

  const filtered = registrations.filter((reg) =>
    reg.marathonTitle?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Applied Marathons</h2>

      <input
        type="text"
        placeholder="Search by title"
        className="input input-bordered mb-4 w-full max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Marathon Title</th>
              <th>Registration Fee</th>
             
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((reg) => (
              <tr key={reg._id}>
                <td>{reg.marathonTitle || 'N/A'}</td>
                <td>{reg.registrationFee ? `$${reg.registrationFee}` : 'Free'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning mr-2"
                    onClick={() => handleUpdateOpen(reg)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(reg._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>





      {/* Update Modal */}
      {isModalOpen && selectedReg && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <h3 className="text-lg font-bold mb-4">Update Registration</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="label">Marathon Title</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  defaultValue={selectedReg.marathonTitle}
                  readOnly
                />
              </div>
              <div>
                <label className="label">Start Date</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  defaultValue={selectedReg.startDate}
                  readOnly
                />
              </div>
              <div>
                <label className="label">Participant Name</label>
                <input
                  type="text"
                  name="participantName"
                  className="input input-bordered w-full"
                  defaultValue={selectedReg.participantName}
                  required
                />
              </div>
              <div>
                <label className="label">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  className="input input-bordered w-full"
                  defaultValue={selectedReg.contactNumber}
                  required
                />
              </div>
              <div>
                <label className="label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="input input-bordered w-full"
                  defaultValue={selectedReg.address}
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;
