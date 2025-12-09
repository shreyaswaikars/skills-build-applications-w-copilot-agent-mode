import React, { useEffect, useState } from 'react';

const Modal = ({ show, onClose, team }) => (
  <div className={`modal fade${show ? ' show d-block' : ''}`} tabIndex="-1" style={{ background: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Team Details</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {team ? (
            <div>
              <p><strong>Name:</strong> {team.name}</p>
              <p><strong>Description:</strong> {team.description}</p>
              <p><strong>Members:</strong> {team.members ? team.members.length : 0}</p>
            </div>
          ) : <p>No team selected.</p>}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </div>
);

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4 text-success">Teams</h2>
      <div className="card mb-4">
        <div className="card-body">
          <form className="row g-3 mb-3">
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-success w-100" disabled>Add</button>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Members</th>
                  <th>Description</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{team.name || '-'}</td>
                    <td>{team.members ? team.members.length : '-'}</td>
                    <td>{team.description || '-'}</td>
                    <td>
                      <button className="btn btn-outline-success btn-sm" onClick={() => { setSelectedTeam(team); setShowModal(true); }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-success mt-3" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} team={selectedTeam} />
    </div>
  );
};

export default Teams;
