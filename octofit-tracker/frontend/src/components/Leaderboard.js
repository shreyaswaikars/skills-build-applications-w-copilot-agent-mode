import React, { useEffect, useState } from 'react';

const Modal = ({ show, onClose, leader }) => (
  <div className={`modal fade${show ? ' show d-block' : ''}`} tabIndex="-1" style={{ background: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Leaderboard Details</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {leader ? (
            <div>
              <p><strong>Name:</strong> {leader.name}</p>
              <p><strong>Score:</strong> {leader.score}</p>
            </div>
          ) : <p>No leader selected.</p>}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </div>
);

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [form, setForm] = useState({ name: '', score: '' });
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4 text-info">Leaderboard</h2>
      <div className="card mb-4">
        <div className="card-body">
          <form className="row g-3 mb-3">
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-md-5">
              <input type="number" className="form-control" placeholder="Score" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} />
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-success w-100" disabled>Add</button>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader, idx) => (
                  <tr key={leader.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{leader.name || '-'}</td>
                    <td>{leader.score || '-'}</td>
                    <td>
                      <button className="btn btn-outline-info btn-sm" onClick={() => { setSelectedLeader(leader); setShowModal(true); }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-info mt-3" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} leader={selectedLeader} />
    </div>
  );
};

export default Leaderboard;
