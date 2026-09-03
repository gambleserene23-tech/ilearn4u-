"use client";
import { useState } from "react";
import type { MessageThread } from "@/data/types";

export function SchoolMessageCentre({threads, names}:{threads:MessageThread[];names:Record<string,string>}){
 const [selected,setSelected]=useState(threads[0]?.id??""); const [draft,setDraft]=useState(""); const thread=threads.find(t=>t.id===selected)??threads[0];
 const send=()=>{if(!draft.trim())return;alert("Demo message queued. In production this will write to Supabase and notify the organisation.");setDraft("")};
 return <div className="portal-panel mt-6"><div className="message-shell"><div className="thread-list">{threads.map(t=><div key={t.id} className={`thread-item ${t.id===selected?'active':''}`} onClick={()=>setSelected(t.id)}><strong>{names[t.organisationId]}</strong><span>{t.subject}</span><div className="mt-1 text-[9px] text-ink-soft">{t.messages.length} messages · {new Date(t.messages.at(-1)?.sentAt??Date.now()).toLocaleDateString("en-AU")}</div></div>)}</div><div className="chat-pane">{thread?<><div className="chat-head"><strong>{names[thread.organisationId]}</strong><div className="text-[10px] text-ink-soft">{thread.subject}</div></div><div className="chat-messages">{thread.messages.map(m=><div key={m.id} className={`chat-bubble ${m.sender}`}><div>{m.body}</div><div className="chat-meta">{m.senderName} · {new Date(m.sentAt).toLocaleString("en-AU")}</div></div>)}</div><div className="chat-compose"><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')send()}} placeholder="Reply to organisation…"/><button onClick={send} className="rounded-md bg-brand-green px-4 py-2 text-xs font-semibold text-white">Send</button></div></>:<div className="p-8 text-sm text-ink-soft">No conversation selected.</div>}</div></div></div>
}
