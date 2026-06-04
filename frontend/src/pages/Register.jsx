import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Lock, ArrowRight, CheckSquare, Loader2 } from 'lucide-react';
import validator from 'validator';

const Register = () => {
  const { registerUser, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = 'Full name is required';
    }

    if (!email) {
      tempErrors.email = 'Email is required';
    } else if (!validator.isEmail(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await registerUser(name, email, password);
      showToast('Registration successful! Account created.', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast(err || 'Registration failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-brand-950/20 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/40 dark:border-gray-800/40 shadow-2xl rounded-3xl p-8 transition-colors duration-300">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-brand-500 rounded-2xl text-white shadow-lg shadow-brand-500/20 mb-4">
            <CheckSquare className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign up to start organizing tasks today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider block">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name
                    ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-gray-200 dark:border-gray-800 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.name && (
              <span className="text-xs text-rose-500 font-medium block pl-1">{errors.name}</span>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email
                    ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-gray-200 dark:border-gray-800 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-rose-500 font-medium block pl-1">{errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.password
                    ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-gray-200 dark:border-gray-800 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.password && (
              <span className="text-xs text-rose-500 font-medium block pl-1">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider block">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                }}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.confirmPassword
                    ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-gray-200 dark:border-gray-800 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-rose-500 font-medium block pl-1">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl transition-all duration-200 shadow-lg shadow-brand-600/10 hover:shadow-brand-600/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group text-sm"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 font-medium">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
