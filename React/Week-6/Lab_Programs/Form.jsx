
import { useState } from 'react';

function WebContext() {
  const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    gender: '',
    subjects: [],
    url: '',
    choice: '',
    about: ''
  };

  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubject = (e) => {
    const { value, checked } = e.target;

    setForm({
      ...form,
      subjects: checked
        ? [...form.subjects, value]
        : form.subjects.filter((s) => s !== value)
    });
  };

  const handleReset = () => {
    setForm({ ...initialForm });
    setResume(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    console.log({ ...form, resume });
  };

  const styles = {
    container: {
      maxWidth: '450px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    },
    heading: {
      textAlign: 'center',
      color: '#28a745',
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginTop: '18px',
      marginBottom: '8px',
      fontSize: '14px'
    },
    input: {
      display: 'block',
      boxSizing: 'border-box',
      width: '100%',
      padding: '10px',
      border: '2px solid #ddd',
      borderRadius: '5px',
      fontSize: '13px',
      background: 'white'
    },
    fieldset: {
      border: 'none',
      padding: 0,
      margin: '24px 0'
    },
    inline: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '7px',
      marginRight: '12px',
      fontSize: '14px'
    },
    textarea: {
      display: 'block',
      boxSizing: 'border-box',
      width: '100%',
      height: '85px',
      padding: '10px',
      border: '2px solid #ddd',
      borderRadius: '5px',
      resize: 'vertical'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '25px'
    },
    button: {
      background: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '9px 25px',
      cursor: 'pointer',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Form in React</h2>

      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label style={styles.label}>First Name*</label>
        <input
          style={styles.input}
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Last Name*</label>
        <input
          style={styles.input}
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Enter Email*</label>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Contact*</label>
        <input
          style={styles.input}
          type="tel"
          name="contact"
          placeholder="Enter Mobile number"
          value={form.contact}
          onChange={handleChange}
          required
        />

        <fieldset style={styles.fieldset}>
          <legend>Gender*</legend>
          {['Male', 'Female', 'Other'].map((gender) => (
            <label style={styles.inline} key={gender}>
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={form.gender === gender}
                onChange={handleChange}
                required
              />
              {gender}
            </label>
          ))}
        </fieldset>

        <fieldset style={styles.fieldset}>
          <legend>Your best Subject*</legend>
          {['English', 'Maths', 'Physics'].map((subject) => (
            <label style={styles.inline} key={subject}>
              <input
                type="checkbox"
                value={subject}
                checked={form.subjects.includes(subject)}
                onChange={handleSubject}
              />
              {subject}
            </label>
          ))}
        </fieldset>

        <label style={styles.label}>Upload Resume*</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0] || null)}
          required
        />

        <label style={styles.label}>Enter URL*</label>
        <input
          style={styles.input}
          type="url"
          name="url"
          placeholder="Enter url"
          value={form.url}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Select your choice</label>
        <select
          style={styles.input}
          name="choice"
          value={form.choice}
          onChange={handleChange}
          required
        >
          <option value="">Select your Ans</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Professional">Professional</option>
        </select>

        <label style={styles.label}>About*</label>
        <textarea
          style={styles.textarea}
          name="about"
          placeholder="About your self"
          value={form.about}
          onChange={handleChange}
          required
        />

        <div style={styles.buttons}>
          <button type="reset" style={styles.button}>
            Reset
          </button>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default WebContext;
