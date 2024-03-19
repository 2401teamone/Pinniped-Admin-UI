import { useState } from 'react';

import Auth from './Auth.jsx';
import Field from '../forms/fields/Field.jsx';
import Button from '../utils/Button.jsx';

import { useAuthContext } from '../../hooks/useAuth';

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [triggerValidation, setTriggerValidation] = useState(false);

  const { login } = useAuthContext();

  const handleSubmit = async () => {
    console.log('logging in', credentials);
    setTriggerValidation(true);
    await login(credentials);
  };

  return (
    <Auth>
      <div className="auth-form">
        <p className="instructions">Admin Signin</p>
        <Field
          label="username"
          type="text"
          value={credentials.username}
          onChange={(val) => setCredentials({ ...credentials, username: val })}
          config={{ required: true, preventSpaces: true }}
          triggerValidation={triggerValidation}
          setTriggerValidation={setTriggerValidation}
        />

        <Field
          label="password"
          type="password"
          value={credentials.password}
          onChange={(val) => setCredentials({ ...credentials, password: val })}
          config={{ required: true }}
          triggerValidation={triggerValidation}
          setTriggerValidation={setTriggerValidation}
        />

        <Button type="primary" onClick={handleSubmit}>
          Sign In
        </Button>
      </div>
    </Auth>
  );
}
