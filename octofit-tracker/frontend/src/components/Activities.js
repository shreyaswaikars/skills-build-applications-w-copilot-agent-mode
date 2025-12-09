import React, { useEffect, useState } from 'react';

const Modal = ({ show, onClose, activity }) => (
  <div className={`modal fade${show ? ' show d-block' : ''}`} tabIndex="-1" style={{ background: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Activity Details</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {activity ? (
            <div>
              <p><strong>Name:</strong> {activity.name}</p>
              <p><strong>Description:</strong> {activity.description}</p>
              <p><strong>Type:</strong> {activity.type}</p>
            </div>
          ) : <p>No activity selected.</p>}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </div>
);

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', type: '' });
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4 text-primary">Activities</h2>
      <div className="card mb-4">
        <div className="card-body">
          <form className="row g-3 mb-3">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
            </div>
            <div className="col-md-1">
              <button type="button" className="btn btn-success w-100" disabled>Add</button>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    <td>{activity.name || '-'}</td>
                    <td>{activity.description || '-'}</td>
                    <td>{activity.type || '-'}</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => { setSelectedActivity(activity); setShowModal(true); }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} activity={selectedActivity} />
    </div>
  );
};

export default Activities;
