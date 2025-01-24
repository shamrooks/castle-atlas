import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

const ResetPasswordPage = ({ onNavigate }) => {
  const [stage, setStage] = useState('request'); // 'request' or 'reset'
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Reset instructions have been sent to your email');
      setStage('reset');
    } catch (error) {
      setError(error.message || 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Password has been reset successfully');
      setTimeout(() => onNavigate('/login'), 2000);
    } catch (error) {
      setError(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const RequestResetView = () => (
    <form onSubmit={handleRequestReset} className="space-y-4">
      {error && (
        <Alert variant="error" title="Error" icon={AlertCircle}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" title="Success" icon={CheckCircle2}>
          {success}
        </Alert>
      )}
      
      <Input
        type="email"
        placeholder="Email"
        icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Button
        type="submit"
        className="w-full"
        loading={loading}
        disabled={loading}
      >
        Send Reset Instructions
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => onNavigate('/login')}
          className="text-text-muted hover:text-primary inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </button>
      </div>
    </form>
  );

  const ResetPasswordView = () => (
    <form onSubmit={handleResetPassword} className="space-y-4">
      {error && (
        <Alert variant="error" title="Error" icon={AlertCircle}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" title="Success" icon={CheckCircle2}>
          {success}
        </Alert>
      )}
      
      <Input
        type="text"
        placeholder="Reset Code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="New Password"
        icon={Lock}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="Confirm New Password"
        icon={Lock}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        className="w-full"
        loading={loading}
        disabled={loading}
      >
        Reset Password
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setStage('request')}
          className="text-text-muted hover:text-primary inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reset Request
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <p className="text-center text-text-muted">
            {stage === 'request' 
              ? 'Enter your email to receive reset instructions'
              : 'Enter your reset code and new password'
            }
          </p>
        </CardHeader>
        <CardContent>
          {stage === 'request' ? <RequestResetView /> : <ResetPasswordView />}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;