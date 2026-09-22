import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Language, UserRole } from '../types';
import { X, ShieldCheck, Mail, Building, UserCheck, Sparkles, LogOut, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  language: Language;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ language, onClose }) => {
  const { user, login, register, googleLogin, logout } = useAuth();
  const isAr = language === 'ar';

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('startup');
  const [organization, setOrganization] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (mode === 'login') {
      const success = await login(email);
      setLoading(false);
      if (success) {
        onClose();
      } else {
        setErrorMessage(isAr ? 'فشل تسجيل الدخول. يرجى التحقق من البريد.' : 'Login failed. Please check your email.');
      }
    } else {
      const success = await register(email, name, role, organization);
      setLoading(false);
      if (success) {
        onClose();
      } else {
        setErrorMessage(isAr ? 'فشل إنشاء الحساب أو الحساب موجود بالفعل.' : 'Registration failed or user already exists.');
      }
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoName: string, demoRole: UserRole, demoOrg: string) => {
    setLoading(true);
    await register(demoEmail, demoName, demoRole, demoOrg);
    setLoading(false);
    onClose();
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    await googleLogin('google.user@ventures.qa', 'Google Verified User', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80');
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border-2 border-[#E8DFC8] w-full max-w-md shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#8A1538] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-full text-white/80 hover:text-white bg-black/20"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C5A059] flex items-center justify-center text-[#1E1919] font-black text-base shadow-sm">
              VQ
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {user 
                  ? (isAr ? 'حسابك في المنظومة' : 'Your Ecosystem Account') 
                  : (mode === 'login' ? (isAr ? 'تسجيل الدخول' : 'Sign In to Ventures.qa') : (isAr ? 'إنشاء حساب جديد' : 'Join the Ecosystem'))}
              </h2>
              <p className="text-xs text-white/80">
                {isAr ? 'المنصة المستقلة للشركات الناشئة والاستثمار في قطر' : 'Independent private capital & venture intelligence'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {user ? (
            /* Logged In State */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#8A1538] text-white flex items-center justify-center font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E1919] text-base">{user.name}</h3>
                    <p className="text-xs text-[#7A6D6D] font-mono">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#8A1538]/10 text-[#8A1538]">
                        {user.role}
                      </span>
                      {user.subscriptionTier && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40">
                          {user.subscriptionTier} Tier
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#5A4E4E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'صلاحية الوصول لغرفة بيانات الصفقات والمطابقة' : 'Direct Deal-Flow & Pitch Deck Access Enabled'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'تفعيل تنبيهات البحث المحفوظة والبريد الأسبوعي' : 'Saved Search Alerts & Weekly Intelligence Dispatch'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'إمكانية توثيق وإدارة الملف التعريفي لمؤسستك' : 'Verified Entity Claim & Administration Rights'}</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full mt-4 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
              </button>
            </div>
          ) : (
            /* Auth Form */
            <div className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Google One-Click OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl border border-[#E8DFC8] bg-white hover:bg-[#FAF8F5] text-[#1E1919] text-xs font-bold flex items-center justify-center gap-2.5 shadow-sm transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isAr ? 'المتابعة بحساب Google' : 'Continue with Google Account'}</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-[#E8DFC8] w-full"></div>
                <span className="bg-white px-3 text-[11px] text-[#7A6D6D] uppercase tracking-wider">
                  {isAr ? 'أو عبر البريد' : 'or email'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                        {isAr ? 'الاسم الكامل' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isAr ? 'مثال: ناصر الكواري' : 'e.g. Nasser Al-Kuwari'}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                        {isAr ? 'نوع الحساب / الدور' : 'Ecosystem Role'}
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] bg-white focus:outline-none focus:border-[#8A1538]"
                      >
                        <option value="startup">{isAr ? 'مؤسس / شركة ناشئة (Startup)' : 'Startup Founder / Operator'}</option>
                        <option value="investor">{isAr ? 'مستثمر جريء / مكتب عائلي (Investor)' : 'Venture Investor / Family Office'}</option>
                        <option value="analyst">{isAr ? 'باحث / محلل سوق (Analyst)' : 'Market Analyst / Researcher'}</option>
                        <option value="admin">{isAr ? 'مدير منصة (Admin)' : 'Platform Administrator'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                        {isAr ? 'الشركة أو الصندوق' : 'Organization / Firm'}
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={isAr ? 'مثال: رأس مال فنتشرز' : 'e.g. Tech Ventures LLC'}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#1E1919] mb-1">
                    {isAr ? 'البريد الإلكتروني المؤسسي' : 'Work Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.qa"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#8A1538]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#6E0D29] text-white text-xs font-bold shadow-sm transition-colors"
                >
                  {loading
                    ? (isAr ? 'جاري المعالجة...' : 'Authenticating...')
                    : mode === 'login'
                    ? (isAr ? 'تسجيل الدخول' : 'Sign In')
                    : (isAr ? 'إنشاء الحساب' : 'Create Account')}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-xs text-[#8A1538] hover:underline font-medium"
                >
                  {mode === 'login'
                    ? (isAr ? 'ليس لديك حساب؟ انضم للمنظومة' : "Don't have an account? Create one")
                    : (isAr ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already registered? Sign In')}
                </button>
              </div>

              {/* Instant Test Persona Shortcuts */}
              <div className="pt-3 border-t border-[#E8DFC8]">
                <span className="text-[11px] text-[#7A6D6D] font-semibold block mb-2">
                  {isAr ? 'حسابات تجريبية سريعة:' : 'Quick Test Personas:'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('founder@snoonu.com', 'Hamad Al-Hajri', 'startup', 'Snoonu')}
                    className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F0EAE1] border border-[#E8DFC8] text-left rtl:text-right text-[11px]"
                  >
                    <strong className="block text-[#8A1538] font-bold">Startup Founder</strong>
                    <span className="text-[#7A6D6D]">Hamad (Snoonu)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('investor@rasmal.com', 'Alexander Wiedmer', 'investor', 'Rasmal Ventures')}
                    className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F0EAE1] border border-[#E8DFC8] text-left rtl:text-right text-[11px]"
                  >
                    <strong className="block text-[#C5A059] font-bold">Venture Investor</strong>
                    <span className="text-[#7A6D6D]">Alexander (VC)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
