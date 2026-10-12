import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('surya.sarkar@law.in');
  const [password, setPassword] = useState('password123');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      id: 'adv-001',
      name: 'Advocate Surya Sarkar',
      email: email,
      role: 'Senior Advocate & Legal Researcher',
      barCouncilNo: 'DEL/19824/2022',
    });
    toast.success('Welcome back to Sarkar AI Advocate Chamber!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Court Interior Image Overlay */}
      <img
        src="/courtroom_bg.png"
        alt="Court interior"
        className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-md court-glass-gold rounded-3xl p-8 border-2 border-amber-500/40 shadow-2xl space-y-6">
        
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-600 to-amber-800 p-0.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center">
              <Scale className="w-7 h-7 text-amber-400" />
            </div>
          </div>
          <h1 className="text-2xl font-cinzel font-extrabold gold-text-gradient tracking-wider">
            SARKAR AI
          </h1>
          <p className="text-xs text-slate-300 font-mono uppercase tracking-widest">
            Supreme Judicial Advocate Chamber Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Advocate Email Address:</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
          >
            <span>ENTER ADVOCATE CHAMBER</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-amber-500/20 text-xs text-slate-400">
          Need a new advocate portal account?{' '}
          <Link to="/register" className="text-amber-400 font-bold hover:underline">
            Register Council Access
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
