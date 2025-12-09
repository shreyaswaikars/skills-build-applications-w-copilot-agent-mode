import React, { useEffect, useState } from 'react';

const Modal = ({ show, onClose, workout }) => (
  <div className={`modal fade${show ? ' show d-block' : ''}`} tabIndex="-1" style={{ background: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Workout Details</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {workout ? (
            <div>
              <p><strong>Name:</strong> {workout.name}</p>
              <p><strong>Type:</strong> {workout.type}</p>
              <p><strong>Duration:</strong> {workout.duration}</p>
            </div>
          ) : <p>No workout selected.</p>}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </div>
);

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [form, setForm] = useState({ name: '', type: '', duration: '' });
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4 text-danger">Workouts</h2>
      <div className="card mb-4">
        <div className="card-body">
          <form className="row g-3 mb-3">
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Duration" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
            </div>
            <div className="col-md-3">
              <button type="button" className="btn btn-success w-100" disabled>Add</button>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <td>{workout.name || '-'}</td>
                    <td>{workout.type || '-'}</td>
                    <td>{workout.duration || '-'}</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => { setSelectedWorkout(workout); setShowModal(true); }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-danger mt-3" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} workout={selectedWorkout} />
    </div>
  );
};

export default Workouts;
