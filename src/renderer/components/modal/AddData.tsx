import { useState } from "react";

interface AddDataProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddData({ isOpen, onClose }: AddDataProps) {
    const [addTab, setAddTab] = useState<'password' | 'note'>('password');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="bg-[#111318] border border-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col z-10 overflow-hidden">
            
            <div className="p-8 pb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white tracking-tight">Add New Entry</h2>
                <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-400 hover:text-white transition-colors">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <div className="px-8 flex gap-3 mb-6">
                <button onClick={() => setAddTab('password')} className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${addTab === 'password' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800/50 text-slate-400 hover:text-slate-300'}`}>Password</button>
                <button onClick={() => setAddTab('note')} className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${addTab === 'note' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800/50 text-slate-400 hover:text-slate-300'}`}>Text Note</button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-8 space-y-6 pb-8">
                
                {addTab === 'password' && (<div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Site Name *</label>
                            <input type="text" placeholder="Google" className="w-full px-5 py-3.5 bg-[#08090d] border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-700"/>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Site URL</label>
                            <input type="text" placeholder="https://..." className="w-full px-5 py-3.5 bg-[#08090d] border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-700"/>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Username / Email *</label>
                        <input type="email" placeholder="user@example.com" className="w-full px-5 py-3.5 bg-[#08090d] border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-700"/>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Password *</label>
                        <div className="relative">
                            <input type="password" value="password123" className="w-full px-5 py-3.5 bg-[#08090d] border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white"/>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3 text-slate-500">
                                <button className="hover:text-blue-400"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                                <button className="hover:text-blue-400"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0c0e12] border border-slate-800 rounded-3xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-300">Password Generator</span>
                            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-2 hover:bg-blue-500 transition-all">
                                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                Generate
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-slate-500 whitespace-nowrap w-20">Length: 16</span>
                            <input type="range" className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-slate-800/50 border border-slate-800 text-blue-400 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-all">Uppercase</button>
                            <button className="flex-1 py-2 bg-slate-800/50 border border-slate-800 text-blue-400 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-all">Numbers</button>
                            <button className="flex-1 py-2 bg-slate-800/50 border border-slate-800 text-blue-400 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-all">Symbols</button>
                        </div>
                    </div>
                </div>)}

                {addTab === 'note' && (<div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Note Title *</label>
                        <input type="text" placeholder="My Private Note" className="w-full px-5 py-3.5 bg-[#08090d] border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-700"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Content *</label>
                        <textarea rows={6} placeholder="Write something secure..." className="w-full px-5 py-4 bg-[#08090d] border border-slate-800 rounded-3xl focus:border-blue-500 outline-none transition-all text-white resize-none"></textarea>
                    </div>
                </div>)}

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Category</label>
                        <select className="w-full px-5 py-3.5 bg-[#08090d] border border-slate-800 rounded-2xl text-white outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-position-[right_20px_center]">
                            <option>Social</option>
                            <option>Finance</option>
                            <option>Personal</option>
                            <option>Work</option>
                        </select>
                    </div>
                    {addTab === 'password' && (<div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Notes</label>
                        <textarea placeholder="Additional information..." className="w-full px-5 py-4 bg-[#08090d] border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-white resize-none"></textarea>
                    </div>)}
                </div>
            </div>

            <div className="p-8 border-t border-slate-800 flex gap-4 bg-[#0c0e12]/50 backdrop-blur-md">
                <button onClick={onClose} className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all">Cancel</button>
                <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition-all active:scale-95">Save Entry</button>
            </div>
        </div>
    </div>

    );
}