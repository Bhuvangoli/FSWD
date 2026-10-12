function Dashboard({ isLoggedIn, username, role }) {
  return (
    <div>
      <h2>Dashboard</h2>

      {isLoggedIn ? (
        <div>
          <h3>Welcome, {username}!</h3>
          <p>Role: {role}</p>

          {role === "admin" && (
            <div>
              <h4>Admin Options</h4>
              <button>Manage Users</button>
              <button>View Reports</button>
            </div>
          )}

          {role === "student" && (
            <div>
              <h4>Student Options</h4>
              <button>View Marks</button>
              <button>View Courses</button>
            </div>
          )}
        </div>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}

function DashboardDemo() {
  return (
    <div>
      <Dashboard
        isLoggedIn={true}
        username="Bhuvan"
        role="admin"
      />

      <Dashboard
        isLoggedIn={true}
        username="Rahul"
        role="student"
      />

      <Dashboard
        isLoggedIn={false}
        username="Guest"
        role="student"
      />
    </div>
  );
}

export default DashboardDemo;
