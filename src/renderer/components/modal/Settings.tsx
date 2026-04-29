interface SettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">

            <div className="bg-[#111318] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">

                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white">Settings</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10 selection:bg-blue-600/30">

                    <div>
                        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Appearance</h3>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Theme</h4><p className="text-[13px] text-slate-500">Light, dark, or follow system</p></div>
                                </div>
                                <select className="bg-[#1a1d24] border border-slate-700 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer appearance-none pr-8 relative bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_8px_center]"><option>System</option><option>Dark</option><option>Light</option></select>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Language</h4><p className="text-[13px] text-slate-500">Interface language</p></div>
                                </div>
                                <select className="bg-[#1a1d24] border border-slate-700 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer appearance-none pr-8 relative bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_8px_center]"><option>Spanish</option><option>English</option><option>French</option></select>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-slate-800 text-slate-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Hide Passwords</h4><p className="text-[13px] text-slate-500">Mask passwords by default</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-slate-800 text-slate-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 18V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 12h16M4 6h16M8 20v-8M16 20v-8"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Compact View</h4><p className="text-[13px] text-slate-500">Show more items with less spacing</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Security</h3>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Auto-Lock</h4><p className="text-[13px] text-slate-500">Lock vault after inactivity</p></div>
                                </div>
                                <select className="bg-[#1a1d24] border border-slate-700 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer appearance-none pr-8 relative bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_8px_center]"><option>15 mins</option><option>5 mins</option><option>1 hour</option></select>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Two-Factor Auth</h4><p className="text-[13px] text-slate-500">Extra login verification</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Biometric Unlock</h4><p className="text-[13px] text-slate-500">Use fingerprint or Face ID</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Clear Clipboard</h4><p className="text-[13px] text-slate-500">Auto-clear after copying</p></div>
                                </div>
                                <select className="bg-[#1a1d24] border border-slate-700 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer appearance-none pr-8 relative bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_8px_center]"><option>30 secs</option><option>1 min</option><option>Never</option></select>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Login Alerts</h4><p className="text-[13px] text-slate-500">Alert on new device sign-in</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Password Generator</h3>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Default Length</h4><p className="text-[13px] text-slate-500">Characters for generated passwords</p></div>
                                </div>
                                <select className="bg-[#1a1d24] border border-slate-700 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer appearance-none pr-8 relative bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_8px_center]"><option>16 chars</option><option>24 chars</option><option>32 chars</option></select>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-slate-800 text-slate-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2.5 2v6h6M21.5 22v-6h-6"></path><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.3"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Include Symbols</h4><p className="text-[13px] text-slate-500">!@#$%^&* etc.</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-slate-800 text-slate-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2.5 2v6h6M21.5 22v-6h-6"></path><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.3"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Include Numbers</h4><p className="text-[13px] text-slate-500">0-9 in generated passwords</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-slate-800 text-slate-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Exclude Ambiguous</h4><p className="text-[13px] text-slate-500">Avoid 0, O, I, 1 confusion</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Notifications</h3>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Push Notifications</h4><p className="text-[13px] text-slate-500">Get alerts and reminders</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Breach Alerts</h4><p className="text-[13px] text-slate-500">Notify on password breach</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Weak Password Alerts</h4><p className="text-[13px] text-slate-500">Flag low-strength passwords</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Password Expiry Alerts</h4><p className="text-[13px] text-slate-500">Remind to rotate old passwords</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Backup & Export</h3>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Auto Backup</h4><p className="text-[13px] text-slate-500">Automatically back up your vault</p></div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-slate-800 text-slate-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Export Vault</h4><p className="text-[13px] text-slate-500">Download all passwords as JSON</p></div>
                                </div>
                                <button className="px-4 py-2 bg-[#1a1d24] hover:bg-slate-800 border border-slate-700 text-sm font-semibold text-white rounded-lg transition-colors">Export</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Account</h3>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Change Master Password</h4><p className="text-[13px] text-slate-500">Update your vault master key</p></div>
                                </div>
                                <button className="px-4 py-2 bg-[#1a1d24] hover:bg-slate-800 border border-slate-700 text-sm font-semibold text-white rounded-lg transition-colors">Change</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest mb-4">Danger Zone</h3>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>
                                    <div><h4 className="text-sm font-semibold text-white">Clear All Passwords</h4><p className="text-[13px] text-slate-500">Permanently delete your entire vault</p></div>
                                </div>
                                <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-sm font-semibold text-red-500 rounded-lg transition-colors">Clear</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="p-6 border-t border-slate-800 bg-[#0c0e12] rounded-b-2xl">
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors">
                        Save & Close
                    </button>
                </div>

            </div>
        </div>

    )
}