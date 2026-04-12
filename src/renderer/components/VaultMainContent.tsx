import { useContext, useRef } from "react"
import { NavigationContext } from "../context/navigationContext"
import { PasswordDetails, ResponsePayload, TextDetails } from "../../shared/api.types";

type Theme = {
    border: string;
    hover: string;
    badgeBg: string;
    badgeText: string;
    logo?: string;
}

function getThemeClasses(category: string, title: string) {
    let theme: Theme = {
        border: "",
        hover: "",
        badgeBg: "",
        badgeText: "",
        logo: "",
    };

    switch (category) {
        case 'social':
            theme = { border: "border-blue-500/40", hover: "hover:border-blue-500/70 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.4)]", badgeBg: "bg-blue-500/10", badgeText: "text-blue-400", logo: "" };
            break;
        case 'work':
            theme = { border: "border-indigo-500/40", hover: "hover:border-indigo-500/70 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.4)]", badgeBg: "bg-indigo-500/10", badgeText: "text-indigo-400", logo: "" };
            break;
        case 'entertainment':
            theme = { border: "border-pink-500/40", hover: "hover:border-pink-500/70 hover:shadow-[0_0_40px_-5px_rgba(236,72,153,0.4)]", badgeBg: "bg-pink-500/10", badgeText: "text-pink-400", logo: "" };
            break;
        case 'finance':
            theme = { border: "border-emerald-500/40", hover: "hover:border-emerald-500/70 hover:shadow-[0_0_40px_-5px_rgba(34,197,94,0.4)]", badgeBg: "bg-emerald-500/10", badgeText: "text-emerald-400", logo: "" };
            break;
        case 'shopping':
            theme = { border: "border-orange-500/40", hover: "hover:border-orange-500/70 hover:shadow-[0_0_40px_-5px_rgba(249,115,22,0.4)]", badgeBg: "bg-orange-500/10", badgeText: "text-orange-400", logo: "" };
            break;
        default:
            theme = { border: "border-slate-500/40", hover: "hover:border-slate-500/70 hover:shadow-[0_0_40px_-5px_rgba(168,85,247,0.4)]", badgeBg: "bg-slate-500/10", badgeText: "text-slate-400", logo: "" };
    }

    theme.logo = title.charAt(0).toUpperCase();
    return theme;
}

function RenderData() {
    const { navigationData } = useContext(NavigationContext);
    console.log(navigationData);

    if (navigationData && "totalEntries" in navigationData && navigationData.totalEntries && navigationData.type) {
        if (navigationData.type === "accounts") {
            return <RenderPassword rows={navigationData.rows as PasswordDetails[]} />
        } else if (navigationData.type === "text") {

        }

    }
}

function RenderPassword({ rows }: { rows: PasswordDetails[] }) {
    return (
        rows.map(password => {
            const theme = getThemeClasses(password.category, password.title);
            const cardBackFaceRef = useRef<HTMLDivElement>(null);
            const flipCard = () => {
                if(cardBackFaceRef.current){
                    cardBackFaceRef.current.classList.toggle("transform-[rotateY(180deg)]");
                }
            }
            return (
                <div className="group perspective w-full max-w-2xl h-100 mx-auto" key={password.id}>
                    <div id="cardInner" ref={cardBackFaceRef} className="relative h-full w-full transition-all duration-500 transform-3d">
                        <div className={["flip-front absolute inset-0 flex flex-col items-center justify-center rounded-xl text-white backface-hidden bg-[#111318] border-t-[3px] p-6 shadow-2xl group transition-all duration-500", theme.hover, theme.border].join(" ")}>
                            <div className="w-full flex items-start justify-between mb-6 relative">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-[#1a1d24] border border-slate-700/50 rounded-2xl flex items-center justify-center shadow-inner group-hover:border-purple-500/30 transition-colors">
                                        <svg className="text-red-500" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4v16l7-4V4zM13 4v16l7-4V4z" /></svg>
                                    </div>
                                    <div className="min-w-0 pr-2">
                                        <h2 className="text-xl font-bold text-white leading-tight truncate" title="Netflix">{password.title}</h2>
                                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 inline-block mt-1">{password.category}</span>
                                    </div>
                                </div>
                                <button className="cursor-pointer text-slate-500 hover:text-amber-400 transition-colors pt-1">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                                </button>
                            </div>

                            <div className="w-full bg-[#090a0f] border border-slate-800 rounded-[20px] p-5 mb-6 space-y-5">
                                <div className="relative">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Username / Email</label>
                                    <div className="flex items-center justify-between">
                                        <span id="usernameText" className="text-[17px] font-semibold text-slate-100 truncate pr-4">user@gmail.com</span>
                                        <button className="cursor-pointer text-slate-600 hover:text-blue-400 transition-colors">
                                            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-800/50 w-full"></div>

                                <div className="relative">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Password</label>
                                    <div className="flex items-center justify-between">
                                        <input id="passwordInput" type="password" value="SuperSecret123!" readOnly={true}
                                            className="bg-transparent border-none outline-0 p-0 text-[17px] font-semibold text-slate-100 focus:ring-0 w-full"/>
                                            <div className="flex gap-3 ml-2">
                                                <button className="cursor-pointer text-slate-600 hover:text-blue-400 transition-colors">
                                                    <svg id="eyeIcon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                </button>
                                                <button className="cursor-pointer text-slate-600 hover:text-blue-400 transition-colors">
                                                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                                </button>
                                            </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-6 px-1">
                                <span className="text-[10px] text-slate-500 font-medium">Last updated: 2 days ago</span>
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <div className="flex gap-1"><div className="w-2 h-3.5 bg-emerald-500 rounded-sm"></div><div className="w-2 h-3.5 bg-emerald-500 rounded-sm"></div><div className="w-2 h-3.5 bg-emerald-500 rounded-sm"></div></div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Strong</span>
                                </div>
                            </div>

                            <div className="w-full mt-auto flex items-end justify-between relative">
                                <a href="https://netflix.com" className="flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors">
                                    Visit website
                                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"></path></svg>
                                </a>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button onClick={flipCard} className="cursor-pointer p-2 bg-slate-800/50 text-slate-400 hover:text-white rounded-lg transition-all" title="Notes"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg></button>
                                    <button className="cursor-pointer p-2 bg-slate-800/50 text-slate-400 hover:text-blue-400 rounded-lg transition-all" title="Edit"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                                    <button className="cursor-pointer p-2 bg-slate-800/50 text-slate-400 hover:text-red-500 rounded-lg transition-all" title="Delete"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path></svg></button>
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl text-white backface-hidden transform-[rotateY(180deg)] flip-back bg-[#111318] border border-slate-800 p-8 shadow-2xl">
                            <div className="w-full flex items-center gap-3 mb-6">
                                <div className="p-2 bg-slate-800 rounded-lg text-blue-500">
                                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                                </div>
                                <h2 className="text-xl font-bold text-white">Additional Notes</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto text-slate-400 text-sm leading-relaxed italic">
                                <p>Primary account for dev-related personal projects. Linked to physical Yubikey for 2FA. Backup codes stored in physical office safe.</p>
                            </div>
                            <button className="mt-8 cursor-pointer w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all" onClick={flipCard}>
                                ← Back to credentials
                            </button>
                        </div>

                    </div>
                </div>
            );
        })
    )
}

function RenderTexts({ rows }: { rows: TextDetails[] }) {
    return rows.map(textItem => {
        const theme = getThemeClasses(textItem.category, textItem.title);
        return (
            <>
                {/* Text cards */}
                <div className="w-full max-w-md bg-[#111319] border border-slate-800 rounded-4xl p-8 flex flex-col shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]">

                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 bg-green-500/20 text-green-500 border border-green-500/30 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                S
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white">Secret Note</h2>
                                <p className="text-slate-500 text-sm">Personal Encrypted Data</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20">Finance</span>
                    </div>

                    <div className="bg-[#0b0c10] rounded-2xl border border-slate-800/50 overflow-hidden mb-6">
                        <div className="flex justify-end gap-4 px-4 pt-3 text-slate-500 border-b border-slate-800/30 pb-2">
                            <button className="cursor-pointer hover:text-white transition-colors">
                                <svg id="eyeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            </button>
                            <button className="cursor-pointer hover:text-white transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg></button>
                        </div>

                        <div className="p-5 h-44">
                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-3">Stored Content</label>

                            <div id="skeleton" className="space-y-3 animate-pulse">
                                <div className="h-3 bg-slate-800 rounded-full w-3/4"></div>
                                <div className="h-3 bg-slate-800 rounded-full w-full"></div>
                                <div className="h-3 bg-slate-800 rounded-full w-5/6"></div>
                                <div className="h-3 bg-slate-800 rounded-full w-2/3"></div>
                            </div>

                            <div id="realContent" className="hidden h-32 overflow-y-auto pr-2 custom-scrollbar text-slate-300 text-sm leading-relaxed">
                                This content is now revealed! By using a fixed height container for both the skeleton and the text, the card dimensions remain perfectly static. You can scroll through this text once it reaches the height limit of the container.
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto flex justify-between items-center pt-4">
                        <span className="text-xs text-slate-500">Updated 2 hours ago</span>
                        <div className="flex gap-4">
                            <button className="cursor-pointer text-slate-500 hover:text-white transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                            </button>
                            <button className="cursor-pointer text-slate-500 hover:text-blue-400"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></button>
                            <button className="cursor-pointer text-slate-500 hover:text-red-500"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></button>
                        </div>
                    </div>
                </div>
                {/* Text card overlay */}
                <div id="modalOverlay" className="fixed inset-0 bg-black/80 backdrop-blur-sm hidden items-center justify-center z-50 p-4">
                    <div className="bg-[#111319] border border-slate-800 w-full max-w-2xl rounded-4xl shadow-2xl overflow-hidden scale-95 transition-transform duration-300" id="modalContent">
                        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-500/20 text-green-500 border border-green-500/30 rounded-xl flex items-center justify-center text-xl font-bold">S</div>
                                <h2 className="text-3xl font-bold text-white">Secret Note</h2>
                            </div>
                            <button className="cursor-pointer text-slate-500 hover:text-white bg-slate-800/50 p-2 rounded-full transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar text-slate-300 text-lg leading-relaxed">
                            This is the expanded view for better visibility. Here you can read long-form notes with high contrast and plenty of space. The background is blurred to help you focus entirely on the content of the secret note.
                        </div>
                    </div>
                </div>

            </>
        )
    })
}

export function VaultMainContent() {

    return (
        <div className="max-w-300 mx-auto space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <input type="text" placeholder="Search by site or username..." className="w-full bg-[#16181d] border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all" />
                </div>
                <div className="w-full md:w-48 relative">
                    <select className="w-full bg-[#16181d] border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 appearance-none focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 cursor-pointer transition-all">
                        <option>All</option>
                        <option>Work</option>
                        <option>Social</option>
                        <option>Finance</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </div>
            <div id="vault-grid" className="w-full max-w-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {<RenderData />}
            </div>
            <div className="text-right text-xs text-slate-500 mt-8 pb-4">
                <span id="entry-count">0 of 0 entries</span>
            </div>

        </div>
    )
}